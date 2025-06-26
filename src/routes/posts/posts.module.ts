import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

// Module dùng nội bộ, ko cần export ra ngoài
@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}

