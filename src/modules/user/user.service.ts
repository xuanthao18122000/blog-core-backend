import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterPostDTO } from '../auth/dto/index';
import { SendResponse } from 'src/utils/send-response';
import { appDataSource } from 'src/configs/datasource';
import { UtilsProvider } from 'src/utils/provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations : {
        role : true
      }
    });
    return user;
  }

  static async StaticFindUserById(UserId) {
    try {
      const userRepository = appDataSource.getRepository(User);

      return await userRepository
          .createQueryBuilder('users')
          .leftJoinAndSelect('users.role', 'roles')
          .where('users.id = :id', { id: UserId.id })
          .getOne();
    } catch (e) {
      throw 'BACKEND';
    }
  }

  async findUserById(id: number): Promise<User> {
    const user = this.userRepo.findOne({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      throw 'USER_NOT_FOUND';
    }
  }

  async registerUser(user: RegisterPostDTO) {
    try {
      const { email, password, phone, fullName } = user;
      const checkUser = await this.userRepo.findOne({ where: { email } });
      if (checkUser) {
        throw 'EMAIL_EXISTED';
      }
      const newUser = await this.userRepo.create({
        email,
        password: UtilsProvider.generateHash(password),
        phone,
        fullName,
      });
      const saveUser = await this.userRepo.save(newUser);
      if (saveUser) {
        return saveUser;
      } else {
        throw 'BACKEND';
      }
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
