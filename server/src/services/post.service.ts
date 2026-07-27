import prisma from "../prisma";
import { Post } from "../generated/prisma/client";

export class PostService {
  static async createPost({
    title,
    userId,
    description,
  }: {
    title: string;
    userId: string;
    description?: string;
  }): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        title,
        userId,
        description,
      },
    });

    if (!post) {
      throw new Error("Invalid post");
    }

    return post;
  }

  static async getPost(postId: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        images: true,
      },
    });

    if (!post) {
      throw new Error("Invalid post");
    }

    return post;
  }

  static async getAllPosts() {
    const posts = await prisma.post.findMany({
      include: {
        images: true,
      },
    });

    if (!posts.length) {
      throw new Error("No posts found");
    }

    return posts;
  }
}
