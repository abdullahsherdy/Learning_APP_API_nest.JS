import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';

@ApiTags('enrollments')
@Controller()
export class EnrollmentsController {
	constructor(private readonly enrollmentsService: EnrollmentsService) {}

	@Post('courses/:courseId/enroll/:userId')
	enroll(@Param('courseId') courseId: string, @Param('userId') userId: string) {
		return this.enrollmentsService.enroll(userId, courseId);
	}

	@Delete('courses/:courseId/enroll/:userId')
	unenroll(@Param('courseId') courseId: string, @Param('userId') userId: string) {
		return this.enrollmentsService.unenroll(userId, courseId);
	}

	@Get('courses/:courseId/students')
	list(@Param('courseId') courseId: string) {
		return this.enrollmentsService.listStudents(courseId);
	}
}


