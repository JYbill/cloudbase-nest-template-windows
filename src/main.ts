import { ConfigKeyConstant } from './constants/config.constant';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/global.exception';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './common/interceptor/aop.interceptor';
declare const module: any;

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

// 默认项目配置
let projectName = 'app';
let port = 5000;

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  // 配置加载
  const configService = app.get(ConfigService);
  const application = configService.get(ConfigKeyConstant.app);
  port = application[ConfigKeyConstant.port] || port;
  projectName = application[ConfigKeyConstant.project] || projectName;

  // 隐藏 x-powered-by: express header
  app.disable('x-powered-by');

  // 全局校验器
  app.useGlobalPipes(new ValidationPipe());

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 开放静态文件
  app.useStaticAssets(join(__dirname, 'public'), { prefix: '/' });

  // 全局日志AOP拦截器
  app.useGlobalInterceptors(new LoggerInterceptor());

  // local本地/普通服务器开发
  if (process.env.NODE_ENV === 'development') {
    await app.listen(port);

    // HRM热更新
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } else { // cloudbase云开发
    await app.init();
  }

  return expressApp;
}

// 本地开发模式下启动开发
if (process.env.NODE_ENV === 'development') {
  bootstrap().then(() => {
    let info = `listen on http://localhost:${port}`;
    info = module.hot ? `${projectName} webpack HRM ${info}` : `${projectName} Tsc App ${info}`;
    console.log(info);
  });
}
