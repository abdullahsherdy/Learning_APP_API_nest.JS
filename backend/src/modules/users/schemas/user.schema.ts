import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'; //ODM - Object Document Mapper

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) 
export class User {
	@Prop({ unique: true, required: true, lowercase: true, trim: true })
	email: string;

	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ required: true, select: false })
	passwordHash: string;

	@Prop({ type: [String], default: ['student'] })
	roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });


