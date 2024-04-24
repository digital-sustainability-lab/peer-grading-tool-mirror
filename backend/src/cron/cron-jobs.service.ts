import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { PrismaService } from '../prisma.service';

/**
 * the cronjobs service checks at the start of each day (CET) if campaigns start or end and sends mails
 */
@Injectable()
export class CronJobsService {
  constructor(
    // private schedulerRegistry: SchedulerRegistry,
    private prisma: PrismaService,
    private sendgridService: SendgridService,
  ) {}

  private readonly logger = new Logger(CronJobsService.name);

  /**
   * this is the only function of the service
   * the annotation '0 10 0 * * *' means it is fired
   * each day of each month of each year at 0h 10min and 0sec
   */
  // @Cron('0 10 0 * * *', {
  //   name: 'checkMails',
  //   timeZone: 'Europe/Zurich',
  // })
  // async checkMails() {
  //   this.logger.warn(`time to check if emails have to be sent!`);

  //   // getting all campaigns from db
  //   const campaigns: any = await this.prisma.campaign.findMany({
  //     include: {
  //       users: true,
  //       groups: {
  //         include: {
  //           peers: {
  //             include: {
  //               peer: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   // iterating over all campaigns to check their dates
  //   for (let campaign of campaigns) {
  //     // change peers to the right format
  //     for (let group of campaign.groups) {
  //       group.peers = group.peers.map((peer) => {
  //         return { link: peer.link, ...peer.peer };
  //       });
  //     }

  //     // get today as LocaleTime
  //     let today = new Date();
  //     let todayString = today.toLocaleDateString('de-CH', {
  //       timeZone: 'Europe/Zurich',
  //     });

  //     // get dates as LocalTime
  //     let openingDate = new Date(campaign.openingDate);
  //     let closingDate = new Date(campaign.closingDate);
  //     closingDate.setDate(closingDate.getDate() + 1);

  //     let openingDateString = openingDate.toLocaleDateString('de-CH', {
  //       timeZone: 'Europe/Zurich',
  //     });
  //     let closingDateString = closingDate.toLocaleDateString('de-CH', {
  //       timeZone: 'Europe/Zurich',
  //     });

  //     // check if campaign is opening today and send mails
  //     if (openingDateString == todayString) {
  //       this.logger.log('campaign "' + campaign.name + '" opens today');

  //       this.sendgridService.sendAdminMailsOpening(campaign);
  //       this.sendgridService.sendPeerMailsOpening(campaign);
  //     }

  //     // check if campaign is closing today and send mails
  //     if (closingDateString == todayString) {
  //       this.logger.log('campaign "' + campaign.name + '" closes today');

  //       this.sendgridService.sendAdminMailsClosing(campaign);
  //       this.sendgridService.sendPeerMailsClosing(campaign);
  //     }
  //   }
  // }
}
