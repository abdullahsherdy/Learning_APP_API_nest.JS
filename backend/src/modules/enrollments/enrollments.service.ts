import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';

@Injectable()
export class EnrollmentsService {
	constructor(@InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>) {}

	enroll(userId: string, courseId: string) {
		return this.enrollmentModel.findOneAndUpdate(
			{ userId: new Types.ObjectId(userId), courseId: new Types.ObjectId(courseId) },
			{ $setOnInsert: { status: 'active', startedAt: new Date() } },
			{ upsert: true, new: true }
		).lean();
	}

	unenroll(userId: string, courseId: string) {
		return this.enrollmentModel.findOneAndDelete({
			userId: new Types.ObjectId(userId),
			courseId: new Types.ObjectId(courseId),
		}).lean();
	}

	listStudents(courseId: string) {
		return this.enrollmentModel.find({ courseId: new Types.ObjectId(courseId) }).lean();
	}
}


