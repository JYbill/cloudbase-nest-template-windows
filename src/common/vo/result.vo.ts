export class ResultVo {
  code: number;
  msg: string;
  data: any | object | null | Array<any>;

  // 禁止访问
  static readonly forbid_msg = 'not authorize😐';
  // 请求错误
  static readonly requestError_msg = 'request error, pls check your url or uri.👓';

  constructor({ code = 200, msg = 'ok.🚀', data = null }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  // 返回成功对象
  static sendSuccess(data) {
    return new ResultVo({ data });
  }

  // 返回错误对象
  static sendError(code, msg) {
    return new ResultVo({ code, msg });
  }
}