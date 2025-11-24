import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type ProgressDocument = HydratedDocument<Progress>;

@Schema({ timestamps: true })
export class Progress {
	@Prop({ type: Types.ObjectId, ref: 'User', index: true })
	userId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Lesson', index: true })
	lessonId: Types.ObjectId;

	@Prop({ default: false })
	completed: boolean;

	@Prop()
	completedAt?: Date | null;

	@Prop({ default: 0 })
	secondsWatched: number;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
ProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });


