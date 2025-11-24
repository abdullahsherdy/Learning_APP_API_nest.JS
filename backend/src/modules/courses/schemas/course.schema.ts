import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
	// title is the title of the course
	@Prop({ required: true, trim: true })
	title: string;
	// slug is the url of the course, it is unique and lowercase and trimed
	// it is used to generate the url of the course
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	slug: string;

	// description is the description of the course
	@Prop()
	description?: string;
	
	// instructorId is the id of the instructor of the course
	@Prop({ type: Types.ObjectId, ref: 'User', index: true })
	instructorId: Types.ObjectId;

	// tags is the tags of the course
	@Prop({ type: [String], default: [] })
	tags: string[];

	// published is the published status of the course
	@Prop({ default: false })
	published: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({ slug: 1 }, { unique: true });


