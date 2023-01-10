import { Injectable } from '@nestjs/common';
import code from '../../configs/code';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { IsNull, Like, Not, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async listPost(query) {
    try {
      const { page = 1, perPage = 10, status, type } = query;

      const post = await this.postRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        // where: [
        //   {
        //     pm2: status ? Like(`%${status}%`) : Not(IsNull()),
        //   },
        // ],
      });

      return {
        list: post[0],
        total: post[1],
        perPage: parseInt(perPage),
        current_page: parseInt(page),
      };
    } catch (e) {
      throw e;
    }
  }
}
