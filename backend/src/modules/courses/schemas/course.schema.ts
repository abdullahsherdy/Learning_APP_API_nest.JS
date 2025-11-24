import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
	@Prop({ required: true, trim: true })
	title: string;

	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	slug: string;

	@Prop()
	description?: string;

	@Prop({ type: Types.ObjectId, ref: 'User', index: true })
	instructorId: Types.ObjectId;

	@Prop({ type: [String], default: [] })
	tags: string[];

	@Prop({ default: false })
	published: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({ slug: 1 }, { unique: true });


