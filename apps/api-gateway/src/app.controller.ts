import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller({
  version: "1",
  path: "/"
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}
