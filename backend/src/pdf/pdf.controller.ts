import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Request,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { join } from '@prisma/client/runtime';
import { createReadStream, unlink } from 'fs';
import path from 'path';
import { CampaignGuard } from '../guards/campaign.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @UseGuards(JwtAuthGuard, CampaignGuard)
  @Get('/campaign/:id')
  async getCampaignPDF(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: any,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    const userEmail = request.user;

    const buffer = await this.pdfService.getCampaignPDF(
      id,
      userEmail,
      i18n.lang,
    );

    return new StreamableFile(buffer);
  }

  @Get('/review/:url')
  async getReviewPDF(
    @Param('url') url,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    const buffer = await this.pdfService.getReviewPDF(url, i18n.lang);

    return new StreamableFile(buffer);
  }
}
