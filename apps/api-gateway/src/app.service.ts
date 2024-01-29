import { Injectable, Inject } from "@nestjs/common";
import * as schema from ".drizzle/migration/schema";
import { DRIZZLE_ORM } from "src/core/constants/db.constants";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { sysProperties } from "../.drizzle/migration/schema";
import * as isolateVM from "isolated-vm";

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>
  ) {}

  async getHello() {
    const dbHooksList = await this.conn.query.dbHooks.findMany({});
    const script = dbHooksList[0].script;
    const vm = new isolateVM.Isolate({ memoryLimit: 128 });
    const context = vm.createContext();

    const jail = (await context).global;

    jail.setSync("global", jail.derefInto());

    jail.setSync("info", function (...args) {
      console.log(...args);
    });

    jail.setSync("drizzle", (x: string, y: string) => {
      console.log(x, y);
      try {
        this.conn.query.sysDbObject.findMany().then(
          res =>
            new Promise<void>(resolve => {
              console.log(res);
              resolve();
            })
        );
      } catch (err) {
        console.log(err);
      }
      this.conn.insert(sysProperties).values({ sysId: x, text: y }).returning();
    });

    const hostile = vm.compileScriptSync(`${script}`);
    const result = await hostile.run(await context);
    console.log(result);
    return result;
  }
}
