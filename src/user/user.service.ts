import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    
    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }) || [];
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      ...user,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByCpfCnpj(cpf_cnpj: string) {
    return await this.prisma.user.findUnique({ where: { cpf_cnpj } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = updateUserDto;
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
