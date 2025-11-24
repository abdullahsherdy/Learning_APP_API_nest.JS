import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { sign, verify, SignOptions, Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}
	// validateAndLogin is used to validate the user and login the user
	async validateAndLogin(email: string, password: string) {
		// include passwordHash for comparison
		const user = await this.usersService['userModel']
			.findOne({ email })
			.select('+passwordHash +refreshTokenHash')
			.lean();
		if (!user) throw new UnauthorizedException('Invalid credentials');
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) throw new UnauthorizedException('Invalid credentials');

		return this.issueAndPersistTokens(user);
	}

	async register(dto: CreateUserDto) {
		const user = await this.usersService.create(dto);
		return this.issueAndPersistTokens(user as any);
	}

	async refresh(refreshToken: string) {
		try {
			const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret') as any;
			const user = await this.usersService['userModel']
				.findById(decoded.sub)
				.select('+refreshTokenHash')
				.lean();
			if (!user?.refreshTokenHash) throw new UnauthorizedException('Invalid refresh token');
			const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
			if (!ok) throw new UnauthorizedException('Invalid refresh token');
			// rotate tokens
			return this.issueAndPersistTokens(user);
		} catch {
			throw new UnauthorizedException('Invalid refresh token');
		}
	}

	async logoutByRefreshToken(refreshToken: string) {
		try {
			const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret') as any;
			await this.usersService['userModel'].findByIdAndUpdate(decoded.sub, { $set: { refreshTokenHash: null } });
			return { success: true };
		} catch {
			// do not leak info
			return { success: true };
		}
	}

	private signAccess(payload: any) {
		const secret: Secret = process.env.JWT_SECRET || 'dev_jwt_secret';
		const options: SignOptions = { expiresIn: (process.env.JWT_ACCESS_TTL || '15m') as any };
		return sign(payload, secret, options);
	}
	private signRefresh(payload: any) {
		const secret: Secret = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret';
		const options: SignOptions = { expiresIn: (process.env.JWT_REFRESH_TTL || '7d') as any };
		return sign(payload, secret, options);
	}

	private async issueAndPersistTokens(user: { _id: unknown; email: string; roles?: string[] }) {
		const payload = { sub: String((user as any)._id), email: user.email, roles: user.roles ?? [] };
		const accessToken = this.signAccess(payload);
		const refreshToken = this.signRefresh(payload);
		const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
		await this.usersService['userModel'].findByIdAndUpdate(payload.sub, { $set: { refreshTokenHash } });
		return { accessToken, refreshToken };
	}
}


