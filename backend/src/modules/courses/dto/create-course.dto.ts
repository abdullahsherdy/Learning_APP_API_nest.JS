import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateCourseDto {
	@IsString()
	@MinLength(2)
	title: string;

	@IsString()
	@Matches(/^[a-z0-9-]+$/)
	slug: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsMongoId()
	instructorId: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	tags?: string[];

	@IsBoolean()
	@IsOptional()
	published?: boolean;
}


