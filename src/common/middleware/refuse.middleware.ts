import { ResultVo } from '../vo/result.vo';
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthorizeException } from '../exception/instance/authorize.exception';

/**
 * 拒绝的一些请求策列略, 在app.module中配置
 * @param req 
 * @param res 
 * @param next 
 */
export function RefuseMiddleware(req: Request, res: Response, next: NextFunction) {
  throw new AuthorizeException();
}