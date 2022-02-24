import { xiaoQinVarUtils } from './../utils/encapsulation.util';
import { Matches } from "class-validator";

export class Convert {

  @Matches(xiaoQinVarUtils.httpRegExp, { message: 'url验证失败' })
  url: string;

  key?: string;
}