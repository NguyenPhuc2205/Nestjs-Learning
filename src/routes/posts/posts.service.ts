import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  getPosts() {
    return this.prismaService.post.findMany({})
  }

  createPost(body: any) {
    const testUserId = 1

    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: testUserId
      }
    })
  }

  getDetailPost(id: string) {
    return `Detail post with id ${id}`
  }

  updatePost(id: string, body: any) {
    return `Post with id ${id} updated with data: ${JSON.stringify(body)}`
  }

  deletePost(id: string) {
    return `Post with id ${id} deleted`
  }
}
