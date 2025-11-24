import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
	@Prop({ type: Types.ObjectId, ref: 'User', index: true })
	userId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Course', index: true })
	courseId: Types.ObjectId;

	@Prop({ enum: ['active', 'completed', 'dropped'], default: 'active' })
	status: 'active' | 'completed' | 'dropped';

	@Prop()
	startedAt?: Date;

	@Prop()
	completedAt?: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });


