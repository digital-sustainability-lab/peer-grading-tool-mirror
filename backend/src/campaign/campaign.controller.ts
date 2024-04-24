import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CampaignGuard } from '../guards/campaign.guard';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CampaignService } from './campaign.service';
import { Campaign, Prisma } from '@prisma/client';
import { CampaignValidationPipe } from '../validators/create-campaign-validation.pipe';
import { MailsSent } from '../interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get('user')
  async getCampaignsByUser(@Request() request): Promise<any> {
    return this.campaignService.getCampaignsByUser(request.user.email);
  }

  @Get('/:id')
  @UsePipes(ParseIntPipe)
  @UseGuards(CampaignGuard)
  async getCampaignById(@Param('id') id: number): Promise<Campaign> {
    return this.campaignService.getCampaignById(id);
  }

  @Get('/start/:id')
  @UseGuards(CampaignGuard)
  async startCampaign(
    @Param('id', ParseIntPipe) id: number,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    return this.campaignService.startCampaign(id, i18n.lang);
  }

  @Get('/end/:id')
  @UseGuards(CampaignGuard)
  async endCampaign(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.campaignService.endCampaign(id);
  }

  @Get('/results/:id')
  @UseGuards(CampaignGuard)
  async sendResultMails(
    @Param('id', ParseIntPipe) id: number,
    @I18n() i18n: I18nContext,
  ): Promise<MailsSent> {
    return this.campaignService.sendResultMails(id, i18n.lang);
  }

  @Get('/reminder-mails/:id')
  @UseGuards(CampaignGuard)
  async sendReminderMails(
    @Param('id', ParseIntPipe) id: number,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    return this.campaignService.sendReminderMails(id, i18n.lang);
  }

  @Post('create')
  async createCampaign(
    @Body()
    campaignData: Prisma.CampaignUncheckedCreateInput,
    @Request() request,
  ): Promise<Campaign> {
    const user = request.user;

    const campaignValidation = new CampaignValidationPipe(campaignData, true);

    campaignValidation.transform(campaignData, null);

    return this.campaignService.createCampaign(campaignData, user);
  }

  @Post('update')
  @UseGuards(CampaignGuard)
  async updateCampaign(
    @Body()
    campaignData: Prisma.CampaignUncheckedCreateInput,
    @Request() request,
    @I18n() i18n: I18nContext,
  ): Promise<Campaign> {
    const user = request.user;

    const campaignValidation = new CampaignValidationPipe(campaignData, false);

    campaignValidation.transform(campaignData, null);

    return this.campaignService.updateCampaign(campaignData, user, i18n.lang);
  }

  @Delete('/:id')
  @UseGuards(CampaignGuard)
  async deleteCampaign(@Param('id', ParseIntPipe) id: number) {
    return this.campaignService.deleteCampaign({ campaignId: id });
  }
}
