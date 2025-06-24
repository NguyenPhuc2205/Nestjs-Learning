import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts'
  }

  createPost(body: any) {
    return body
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
