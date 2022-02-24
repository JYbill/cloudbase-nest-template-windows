import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { xiaoQinVarUtils } from '../utils/encapsulation.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    const {
      error,
      message
    } = exceptionRes;
    console.log('❗❗❗', exceptionRes);
    // console.log(`================== exception end! ==================\n`);
    // console.log('url', request.url, request.baseUrl, request.path, request.originalUrl); // 测试
    response.status(status).json({
      code: status,
      timestamp: xiaoQinVarUtils.dateFormatByEcma(+new Date()),
      path: request.originalUrl,
      error,
      message,
      checked: '校验, 这是自定义全局捕获过滤器, 看到此消息证明为可控异常内🎁'
    });
  }
}