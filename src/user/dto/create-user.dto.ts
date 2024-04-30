import { User } from '../entities/user.entity';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(11)
    @MaxLength(14)
    cpf_cnpj: string;

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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}