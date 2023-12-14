import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/decorators/allow.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  status(): string {
    return this.appService.getHello();
  }
}
