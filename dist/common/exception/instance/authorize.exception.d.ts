import { HttpException, HttpStatus } from "@nestjs/common";
export declare class AuthorizeException extends HttpException {
    private static readonly exceptionMsg;
    constructor(exceptionMsg?: string | object, statusCode?: HttpStatus);
}
