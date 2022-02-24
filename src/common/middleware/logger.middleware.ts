import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = +new Date();
    const { method, originalUrl } = req;

    // 打印日志
    console.log(`==================  ${method} ${originalUrl}请求开始  ==================`);
    console.log('params: ', req.params);
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    next();
    console.log(`==================  ${method} ${originalUrl}请求耗时: ${+new Date() - start}ms  ==================\n`);
  }
}
