import { Module } from '@nestjs/common';
import { DemoService } from './demo/demo.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [DemoModule],
  providers: [DemoService],
  controllers: [DemoController],
})
export class AppModule { }
