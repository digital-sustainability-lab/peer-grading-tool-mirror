import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma.service';
/**
 * the campaign guard checks if a campaign belongs to the user requesting it
 * most of the false campaign claims are already caught in the frontend tough
 */
@Injectable()
export class CampaignGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params, method, body } = context.switchToHttp().getRequest();

    const userCampaigns = await this.prisma.campaign.findMany({
      where: {
        users: {
          some: {
            email: user.email,
          },
        },
      },
    });

    if (method === 'GET' || method === 'DELETE') {
      return userCampaigns.find((c) => c.campaignId == params.id) != null;
    } else if (method === 'POST') {
      return (
        body.campaignId === 0 ||
        userCampaigns.find((c) => c.campaignId == body.campaignId) != null
      );
    }

    return true;
  }
}
