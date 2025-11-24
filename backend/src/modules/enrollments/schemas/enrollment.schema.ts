import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
	// userId is the id of the user who enrolled in the course
	@Prop({ type: Types.ObjectId, ref: 'User', index: true })
	userId: Types.ObjectId;

	// courseId is the id of the course that the user enrolled in
	@Prop({ type: Types.ObjectId, ref: 'Course', index: true })
	courseId: Types.ObjectId;

	// status is the status of the enrollment
	@Prop({ enum: ['active', 'completed', 'dropped'], default: 'active' })
	status: 'active' | 'completed' | 'dropped';

	// startedAt is the date and time when the user started the course
	@Prop()
	startedAt?: Date;

	// completedAt is the date and time when the user completed the course
	@Prop()
	completedAt?: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
// index is used to speed up the queries
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });


