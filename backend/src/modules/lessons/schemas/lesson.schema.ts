import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
	// courseId is the id of the course that the lesson belongs to
	@Prop({ type: Types.ObjectId, ref: 'Course', index: true })
	courseId: Types.ObjectId;

	// title is the title of the lesson
	@Prop({ required: true, trim: true })
	title: string;

	// content is the content of the lesson
	@Prop()
	content?: string;

	// order is the order of the lesson in the course
	@Prop({ default: 0 })
	order: number;

	// durationSec is the duration of the lesson in seconds
	@Prop({ default: 0 })
	durationSec: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
// index is used to speed up the queries
LessonSchema.index({ courseId: 1, order: 1 });


