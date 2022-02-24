import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = +new Date();
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;

    // 打印日志
    console.log(`==================  ${method} ${originalUrl}请求开始  ==================`);
    console.log('params: ', req.params);
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    return next.handle().pipe(tap(
      () => console.log(`==================  ${method} ${originalUrl}请求耗时: ${+new Date() - start}ms  ==================\n`)
    ));
  }
}