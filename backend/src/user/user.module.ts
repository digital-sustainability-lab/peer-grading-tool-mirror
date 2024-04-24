import { Module } from '@nestjs/common';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppService } from '../app.service';
import { SanitizeService } from '../sanitize/sanitize.service';

@Module({
  providers: [
    UserService,
    PrismaService,
    SendgridService,
    AppService,
    SanitizeService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
