import { Controller, Get } from '@nestjs/common';

@Controller('demo')
export class DemoController {

  @Get()
  get() {
    return {
      code: 200,
      msg: 'msg get 😀'
    }
  }
}
