import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/decorators/allow.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  status(): string {
    console.log('hre>>2 from app.controller.ts');
    return this.appService.getHello();
  }
}
