import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgressService } from './progress.service';

@ApiTags('progress')
@Controller()
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Post('lessons/:lessonId/progress/:userId')
	update(
		@param('lessonId') lessonId: string,
		@param('userId') userId: string,
		@Body() body: { completed?: boolean; secondsWatched?: number }
	) {
		return this.progressService.upsert(userId, lessonId, body);
	}

	@Get('lessons/:lessonId/progress/:userId')
	getForLesson(@param('lessonId') lessonId: string, @param('userId') userId: string) {
		return this.progressService.getForLesson(userId, lessonId);
	}
}


