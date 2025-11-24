import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	// create is used to create a new user(signup) 
	async create(dto: CreateUserDto) {
		const passwordHash = await bcrypt.hash(dto.password, 10);
		try {
			return await this.userModel.create({
				email: dto.email,
				name: dto.name,
				passwordHash,
			});
			// catch any type of exceptions 
		} catch (e: any) {
			if (e?.code === 11000) {
				throw new ConflictException('Email already exists');
			}
			throw e;
		}
	}

	findAll() {
		return this.userModel.find().lean();
	}

	findOne(id: string) {
		return this.userModel.findById(id).lean();
	}

	async update(id: string, dto: UpdateUserDto) {

		const data: Record<string, unknown> = {};
		if (dto.email !== undefined) data.email = dto.email;
		if (dto.name !== undefined) data.name = dto.name;
		if ((dto as any).password) {
			data.passwordHash = await bcrypt.hash((dto as any).password, 10);
		}
		return this.userModel.findByIdAndUpdate(id, data, { new: true }).lean();

	}

	remove(id: string) {
		return this.userModel.findByIdAndDelete(id).lean();
	}

}


