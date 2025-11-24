import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../../common/guards/jwt.strategy';

@Module({
	// imports the users module and the passport module
	imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
	// controllers are the controllers for the auth module
	controllers: [AuthController],
	// providers are the providers for the auth module
	providers: [AuthService, JwtStrategy],
	// exports are the exports for the auth module
	exports: [AuthService],
})
export class AuthModule {}


