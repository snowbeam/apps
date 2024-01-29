// eslint-disable-next-line import/no-unresolved
import { AbstractServer } from "server/abstract-server";
import { Service } from "typedi";

@Service()
export class Server extends AbstractServer {
  constructor() {
    super('main');
  }

  public async start(): Promise<void> {
    await super.init();
  }
}
