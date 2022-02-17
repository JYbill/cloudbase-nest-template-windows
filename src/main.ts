import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
declare const module: any;

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);
const port = process.env.PORT || 5000;

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  // 隐藏 x-powered-by: express header
  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'development') { // local本地/普通服务器开发
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
  let info = `listen on http://localhost:${port}`;
  info = module.hot ? 'webpack HRM ' + info : 'Tsc App ' + info;
  bootstrap().then(() => {
    console.log(info);
  });
}

/* 
Bug1: 
(node:52172) [DEP_WEBPACK_MODULE_ERRORS] DeprecationWarning: Module.errors was removed (use getErrors instead)
(Use `node --trace-deprecation ...` to show where the warning was created)
*/