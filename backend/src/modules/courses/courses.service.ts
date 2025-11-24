import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
	constructor(@InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>) {}

	create(dto: CreateCourseDto) {
		return this.courseModel.create({
			title: dto.title,
			slug: dto.slug,
			description: dto.description,
			instructorId: new Types.ObjectId(dto.instructorId),
			tags: dto.tags ?? [],
			published: dto.published ?? false,
		});
	}

	findAllPaginated(query: { page?: number; limit?: number; q?: string; tag?: string }) {
		const page = Math.max(1, query.page ?? 1);
		const limit = Math.min(100, Math.max(1, query.limit ?? 10));
		const filter: any = {};
		if (query.q) {
			filter.$or = [
				{ title: { $regex: query.q, $options: 'i' } },
				{ description: { $regex: query.q, $options: 'i' } },
			];
		}
		if (query.tag) {
			filter.tags = query.tag;
		}
		return this.courseModel
			.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
	}

	findOne(id: string) {
		return this.courseModel.findById(id).lean();
	}

	update(id: string, dto: UpdateCourseDto) {
		const data: Record<string, unknown> = { ...dto };
		if ((dto as any).instructorId) {
			data.instructorId = new Types.ObjectId((dto as any).instructorId);
		}
		return this.courseModel.findByIdAndUpdate(id, data, { new: true }).lean();
	}

	remove(id: string) {
		return this.courseModel.findByIdAndDelete(id).lean();
	}
}


