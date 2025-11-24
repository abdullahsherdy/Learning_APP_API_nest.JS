import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
	constructor(@InjectModel(Lesson.name) private readonly lessonModel: Model<LessonDocument>) {}

	create(dto: CreateLessonDto) {
		return this.lessonModel.create({
			courseId: new Types.ObjectId(dto.courseId),
			title: dto.title,
			content: dto.content,
			order: dto.order ?? 0,
			durationSec: dto.durationSec ?? 0,
		});
	}

	findByCourse(courseId: string) {
		return this.lessonModel.find({ courseId: new Types.ObjectId(courseId) }).lean();
	}

	findOne(id: string) {
		return this.lessonModel.findById(id).lean();
	}

	update(id: string, dto: UpdateLessonDto) {
		const data: Record<string, unknown> = { ...dto };
		if ((dto as any).courseId) {
			data.courseId = new Types.ObjectId((dto as any).courseId);
		}
		return this.lessonModel.findByIdAndUpdate(id, data, { new: true }).lean();
	}

	remove(id: string) {
		return this.lessonModel.findByIdAndDelete(id).lean();
	}
}


