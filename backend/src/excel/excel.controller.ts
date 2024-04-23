import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { arrayBuffer } from 'stream/consumers';
import { CampaignGuard } from '../guards/campaign.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExcelService } from './excel.service';
import { createWriteStream, writeFileSync } from 'fs';
import { Response } from 'express';
import { Stream } from 'stream';
import { I18n, I18nContext } from 'nestjs-i18n';

@UseGuards(JwtAuthGuard, CampaignGuard)
@Controller('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Get('/:id')
  async getCampaignExcel(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    const stream = new Stream.PassThrough();
    const buffer = await this.excelService.getCampaignExcel(id, i18n.lang);
    await buffer.xlsx.write(stream);

    stream.pipe(response);
  }
}
