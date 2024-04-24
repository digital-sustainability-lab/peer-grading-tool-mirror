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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import {
  changePWSchema,
  createUserSchema,
  updateUserSchema as updateUserSchema,
} from '../validators/joi-objects';

import { RolesGuard } from '../guards/roles.guard';
import { UserService } from './user.service';
import { JoiValidationPipe } from '../validators/joi-validation.pipe';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER')
  @Get('admins')
  async getAllAdmins() {
    return this.userService.getAdmins();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER')
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @Post('admin')
  async createAdmin(
    @Body()
    adminData: Prisma.UserUncheckedCreateInput,
  ): Promise<User> {
    return this.userService.createAdmin(adminData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER')
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  @Post('admin/update')
  async updateAdmin(
    @Body()
    adminData: User,
  ): Promise<User> {
    return this.userService.updateAdmin(adminData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER')
  @Delete('')
  async deleteUser(@Body() user: Prisma.UserWhereUniqueInput) {
    this.userService.deleteUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(changePWSchema))
  @Post('admin/pw')
  async adminPWChange(
    @Body()
    adminData: {
      password: string;
    },
    @Request() req,
  ): Promise<any> {
    return this.userService.updateAdminPW({
      ...adminData,
      email: req.user.email,
    });
  }
}
