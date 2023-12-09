import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  status(): string {
    console.log('hre>>2 from app.controller.ts')
    return this.appService.getHello();
  }
}
