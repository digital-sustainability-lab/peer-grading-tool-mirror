import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser(req.user.email);
    delete user['password'];
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.email);
  }

  @Post('register')
  async registerUser(@Body() registerData, @I18n() i18n: I18nContext) {
    return this.authService.register(registerData, i18n.lang);
  }

  @Post('confirm-email')
  async confirmEmail(@Body() registerTokenData: any) {
    return this.authService.confirmEmail(registerTokenData.registerToken);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const email = req.user.email;
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(email, refreshToken);
  }
}
