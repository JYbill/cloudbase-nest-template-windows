import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';


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
  } else { // cloudbase云开发
    await app.init();
  }

  return expressApp;
}

// 本地开发模式下启动开发
if (process.env.NODE_ENV === 'development') {
  bootstrap().then(() => {
    console.log(`App listen on http://localhost:${port}`);
  });
}
