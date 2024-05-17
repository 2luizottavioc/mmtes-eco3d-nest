import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @Post('auth/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Request() req: AuthRequest) {
        return this.authService.register(req.body);
    }

    @IsPublic()
    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }

    @Get('auth/me')
    @UseGuards(JwtAuthGuard)
    async me(@CurrentUser() user: User) {
        return { user };
    }
}