import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';

@Injectable()
export class ProgressService {
	constructor(@InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>) {}

	upsert(userId: string, lessonId: string, data: { completed?: boolean; secondsWatched?: number }) {
		const set: Record<string, unknown> = {};
		if (typeof data.completed === 'boolean') {
			set.completed = data.completed;
			set.completedAt = data.completed ? new Date() : null;
		}
		if (typeof data.secondsWatched === 'number') {
			set.secondsWatched = data.secondsWatched;
		}
		return this.progressModel
			.findOneAndUpdate(
				{ userId: new Types.ObjectId(userId), lessonId: new Types.ObjectId(lessonId) },
				{ $set: set, $setOnInsert: { completed: false, secondsWatched: 0 } },
				{ new: true, upsert: true }
			)
			.lean(); // to return plain JSON and reduce memory 
	}

	getForLesson(userId: string, lessonId: string) {
		return this.progressModel
			.findOne({ userId: new Types.ObjectId(userId), lessonId: new Types.ObjectId(lessonId) })
			.lean();
	}

	getForCourse(userId: string, lessonIds: string[]) {
		return this.progressModel
			.find({
				userId: new Types.ObjectId(userId),
				lessonId: { $in: lessonIds.map((id) => new Types.ObjectId(id)) },
			})
			.lean();
	}
}


