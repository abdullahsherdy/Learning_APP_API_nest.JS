import { IsMongoId, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateLessonDto {
	@IsMongoId()
	courseId: string;

	@IsString()
	title: string;

	@IsString()
	@IsOptional()
	content?: string;

	@IsNumber()
	@Min(0)
	@IsOptional()
	order?: number;

	@IsNumber()
	@Min(0)
	@IsOptional()
	durationSec?: number;
}


