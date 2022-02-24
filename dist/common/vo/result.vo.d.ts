export declare class ResultVo {
    code: number;
    msg: string;
    data: any | object | null | Array<any>;
    static readonly forbid_msg = "not authorize\uD83D\uDE10";
    static readonly requestError_msg = "request error, pls check your url or uri.\uD83D\uDC53";
    constructor({ code, msg, data }: {
        code?: number;
        msg?: string;
        data?: any;
    });
    static sendSuccess(data: any): ResultVo;
    static sendError(code: any, msg: any): ResultVo;
}
