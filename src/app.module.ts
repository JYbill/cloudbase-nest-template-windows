import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './common/db/db.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RefuseMiddleware } from './common/middleware/refuse.middleware';
import devConfig from './config/config.dev';
import { ConvertModule } from './modules/convert/convert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [devConfig],
    }),
    ConvertModule,
    DBModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 先处理拒绝中间件  场景: 一边开发一边上线, 拒绝正在开发的接口
    // consumer
    //   .apply(RefuseMiddleware)
    //   .forRoutes('/test')

    consumer.apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
