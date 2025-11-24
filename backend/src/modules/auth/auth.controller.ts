import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() body: { email: string; password: string }) {
		return this.authService.validateAndLogin(body.email, body.password);
	}

	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}

	@Post('refresh')
	refresh(@Body() body: { refreshToken: string }) {
		return this.authService.refresh(body.refreshToken);
	}

	@Post('logout')
	logout(@Body() body: { refreshToken: string }) {
		return this.authService.logoutByRefreshToken(body.refreshToken);
	}
}


