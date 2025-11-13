import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

//fields in the CreateUserDto are not required in the UpdateUserDto

export class UpdateUserDto extends PartialType(CreateUserDto) {}


