import { ConvertService } from './convert.service';
import { ResultVo } from '../../common/vo/result.vo';
import { Body, Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiKeyConstant } from '../../constants/api.constant';
import { Convert } from '../../common/dto/convert.dto';

@Controller('api')
export class ConvertController {

  constructor(private convertService: ConvertService) { }

  @Post('/convert')
  async convert(@Body() reqConvert: Convert) {
    console.log(reqConvert);
    return ResultVo.sendSuccess(null);
  }
}
