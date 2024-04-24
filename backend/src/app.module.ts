import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import config from './config';
import { PrismaService } from './prisma.service';
import { CampaignService } from './campaign/campaign.service';
import { CampaignController } from './campaign/campaign.controller';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PdfService } from './pdf/pdf.service';
import { PdfController } from './pdf/pdf.controller';
import { CalculationsService } from './calculations/calculations.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsService } from './cron/cron-jobs.service';
import { SendgridService } from './sendgrid/sendgrid.service';
import { ExcelService } from './excel/excel.service';
import { ExcelController } from './excel/excel.controller';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { SanitizeService } from './sanitize/sanitize.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        config.get('production')
          ? [
              {
                rootPath: join(__dirname, '..', 'frontend', 'en'), // actual files of the english app
                exclude: ['api'],
                serveRoot: '/en',
              },
              {
                rootPath: join(__dirname, '..', 'frontend', 'de'), // actual files of the german app
                exclude: ['api'],
                serveRoot: '/de', // on what url to find it
              },
              {
                // fallback for when the url has neither /de or /en
                rootPath: join(__dirname, '..', 'frontend', 'en'),
                exclude: ['api'],
                // important: this one has to be the last
              },
            ]
          : [],
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        fallbacks: {
          'de-*': 'de',
          'en-*': 'en',
        },
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [new HeaderResolver(['lang'])],
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
    CampaignController,
    GroupController,
    PdfController,
    ExcelController,
  ],
  providers: [
    AppService,
    PrismaService,
    CampaignService,
    GroupService,
    PdfService,
    CalculationsService,
    // CronJobsService,
    SendgridService,
    ExcelService,
    SanitizeService,
  ],
})
export class AppModule {}
