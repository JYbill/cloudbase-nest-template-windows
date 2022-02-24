import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { ResultVo } from "../../vo/result.vo";

export class AuthorizeException extends HttpException {

  // 默认异常信息
  private static readonly exceptionMsg = {
    message: ResultVo.forbid_msg,
    error: 'no authorize, maybe be banned or forbidden access',
    statusCode: HttpStatus.FORBIDDEN
  }

  constructor(exceptionMsg: string | object = AuthorizeException.exceptionMsg, statusCode = HttpStatus.FORBIDDEN) {
    super(exceptionMsg, statusCode);
  }
}