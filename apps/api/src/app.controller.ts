import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiProperty, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger'

import { AppService } from "src/app.service";

@ApiTags('Workflows')
@Controller({
  version: '1',
  path: '/hello',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getHello(): string {
    return this.appService.getHello();
  }
}
