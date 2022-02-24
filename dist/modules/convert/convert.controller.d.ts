import { ConvertService } from './convert.service';
import { ResultVo } from '../../common/vo/result.vo';
import { Convert } from '../../common/dto/convert.dto';
export declare class ConvertController {
    private convertService;
    constructor(convertService: ConvertService);
    convert(reqConvert: Convert): Promise<ResultVo>;
}
