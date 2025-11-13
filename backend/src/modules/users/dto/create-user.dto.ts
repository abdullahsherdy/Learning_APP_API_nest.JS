import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	// this decorator annotation makes the property visible in the Swagger UI
	@ApiProperty({ example: 'test1@example.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ minLength: 2 })
	@IsString()
	@MinLength(2)
	name: string;

	@ApiProperty({ minLength: 8 })
	@IsString()
	@MinLength(8)
	password: string;
}