import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AopInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    // 执行所有的接口方法前
    // TODO

    const ret = next
      .handle()
      .pipe(
        tap(() => console.log('end')));

    // 执行方法后...
    // TODO

    return ret;
  }
}