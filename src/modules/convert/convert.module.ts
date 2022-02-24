import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import { DBModule } from '../../common/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [ConvertController],
  providers: [ConvertService]
})
export class ConvertModule { }
