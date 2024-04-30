import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(11)
    @MaxLength(12)
    @Matches(/^[0-9]*$/, {
        message: 'contact must be just numbers',
    })
    contact: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}
