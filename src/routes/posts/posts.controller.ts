import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from 'src/routes/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}
  
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body)
  }

  @Get(':id')
  getDetailPost(@Param('id') id: string) {
    console.log(id)
    return this.postsService.getDetailPost(id)
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    // Thứ tự Param và Body không quan trọng, có thể để ngược lại
    return this.postsService.updatePost(id, body)
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id)
  }
}
