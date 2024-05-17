import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            cpf_cnpj: user.cpf_cnpj,
            contact: user.contact,
            name: user.name,
        };
        
        const token = await this.jwtService.signAsync(payload);

        return { user, token };
    }

    async register(user: User): Promise<User> {
        const newUser = await this.userService.create(user);
        
        return {
            ...newUser,
            password: undefined,
        };
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) return {
                ...user,
                password: undefined,
            };
        }
        
        throw new UnauthorizedError('Email address or password provided is incorrect.');
    }
}