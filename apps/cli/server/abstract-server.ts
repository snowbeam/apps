/* eslint-disable import/no-unresolved */

import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerFactory,
  FastifyServerFactoryHandler
} from "fastify";
import { readFileSync } from "node:fs";
import {
  type IncomingMessage,
  type Server,
  type ServerResponse,
  createServer as createHttpServer
} from "node:http";
import { createServer as createHttpsServer } from "node:https";
import path from "node:path";
import { type SnowbeamInstanceType } from "server/interfaces/generic";
import { Service } from "typedi";

@Service()
export abstract class AbstractServer {
  protected app!: FastifyInstance;

  protected protocol: "http" | "https";

  protected server!: Server;

  protected serverFactory:
    | FastifyServerFactory<
        Server<typeof IncomingMessage, typeof ServerResponse>
      >
    | undefined;

  protected sslCert!: string;

  protected sslKey!: string;

  public constructor(_instanceType: SnowbeamInstanceType = "main") {
    this.protocol = "https";
    this.sslCert = readFileSync(
      // eslint-disable-next-line unicorn/prefer-module
      path.resolve(__dirname + "/keys/cert.pem"),
      "utf8"
    );
    this.sslKey = readFileSync(
      // eslint-disable-next-line unicorn/prefer-module
      path.resolve(__dirname + "/keys/key.pem"),
      "utf8"
    );

    this.serverFactory = (
      handler: FastifyServerFactoryHandler,
      _opts: unknown
    ) => {
      this.server =
        this.protocol === "https" && this.sslCert && this.sslKey
          ? createHttpsServer(
              { cert: this.sslCert, key: this.sslKey, passphrase: "developer" },
              (req, res) => {
                handler(req, res);
              }
            )
          : createHttpServer((req, res) => {
              handler(req, res);
            });

      return this.server;
    };

    this.app = Fastify({ logger: true, serverFactory: this.serverFactory });
  }

  // Initialise the server
  public async init(): Promise<void> {
    const PORT = 443;
    const ADDRESS = "0.0.0.0";

    // console.log(__dirname);

    this.app.server.on("error", (error: Error & { code: string }) => {
      if (
        error.code === "EADDRINUSE" ||
        error.code === "ERR_SERVER_ALREADY_LISTEN"
      ) {
        console.log(
          `snowbeam's port ${PORT} is already in use. Do you have another instance of snowbeam running already?`
        );
        // eslint-disable-next-line no-process-exit, unicorn/no-process-exit
        process.exit(1);
      }
    });

    this.app.get("/healthz", async (req: FastifyRequest, res: FastifyReply) => {
      res.send({ status: "ok" });
    });

    await new Promise<void>(resolve => {
      this.app.listen({ host: ADDRESS, port: PORT }, () => resolve());
    });

    console.log(this.app.server.address());

    console.log(`snowbeam ready on ${ADDRESS}, port ${PORT}`);
  }

  public async start(): Promise<void> {
    await this.configure();
  }

  private async configure(): Promise<void> {
    // Additional configuration in derived classes
  }
}
