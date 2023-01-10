import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { SendResponse } from '../../utils/send-response';
import { JwtAuthGuard } from '../../guard/jwt.guard';
import code from '../../configs/code';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/list')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  async listPost(@Query() query) {
    const { keyword, sort_ip, sort_updated } = query;
    try {
      const posts = await this.postService.listPost(query);

      return SendResponse.success(
        {
          list: posts.list,
          total: posts.total,
          perPage: posts.perPage,
          current_page: posts.current_page,
        },
        'Get list success!',
      );
    } catch (err) {
      return SendResponse.error(err);
    }
  }
}
