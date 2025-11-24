import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
	@Prop({ type: Types.ObjectId, ref: 'Course', index: true })
	courseId: Types.ObjectId;

	@Prop({ required: true, trim: true })
	title: string;

	@Prop()
	content?: string;

	@Prop({ default: 0 })
	order: number;

	@Prop({ default: 0 })
	durationSec: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.index({ courseId: 1, order: 1 });


