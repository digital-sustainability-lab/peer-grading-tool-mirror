import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { JoiValidationPipe } from '../validators/joi-validation.pipe';
import { GroupService } from './group.service';
import { createGradingsAndCommentSchema } from '../validators/joi-objects';
import { PrismaService } from '../prisma.service';
import { CalculationsService } from '../calculations/calculations.service';
import { CampaignService } from '../campaign/campaign.service';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private prisma: PrismaService,
    private calculationsService: CalculationsService,
    private campaignService: CampaignService,
  ) {}

  @Get(':url')
  async getGroupByPeer(@Param('url') url): Promise<Group> {
    return this.groupService.getGradingDataByUrl(String(url));
  }

  @Get('review/:url')
  async getGroupForReview(@Param('url') url): Promise<any> {
    return this.groupService.getGradingReviewDataByUrl(String(url));
  }

  @Post()
  async createGradingsAndComment(@Body() data): Promise<any> {
    const campaign = await this.prisma.campaign.findFirst({
      where: {
        groups: {
          some: {
            groupId: data.groupId,
          },
        },
      },
    });

    const campaignToCheck = await this.campaignService.getCampaignById(
      campaign.campaignId,
    );

    if (
      this.calculationsService.getCampaignStatus(campaignToCheck) ==
      'abgeschlossen'
    ) {
      throw new ForbiddenException('campaign is already closed');
    }

    const dataValidation = new JoiValidationPipe(
      createGradingsAndCommentSchema(campaign.maxPoints),
    );

    dataValidation.transform(data, null);

    let response = await this.groupService.upsertGradingsAndComment(data);
    return response;
  }
}
