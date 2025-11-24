import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiTags('lessons')
@Controller()
export class LessonsController {
	constructor(private readonly lessonsService: LessonsService) {}

	@Post('courses/:courseId/lessons')
	create(@Param('courseId') courseId: string, @Body() dto: CreateLessonDto) {
		return this.lessonsService.create({ ...dto, courseId });
	}

	@Get('courses/:courseId/lessons')
	findByCourse(@Param('courseId') courseId: string) {
		return this.lessonsService.findByCourse(courseId);
	}

	@Get('lessons/:id')
	findOne(@Param('id') id: string) {
		return this.lessonsService.findOne(id);
	}

	@Patch('lessons/:id')
	update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
		return this.lessonsService.update(id, dto);
	}

	@Delete('lessons/:id')
	remove(@Param('id') id: string) {
		return this.lessonsService.remove(id);
	}
}


