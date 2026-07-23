import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  static async createPost(req: AuthRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const userId = req.user?.userId;

      if (!title || !userId) {
        return res.status(400).json({
          error: "Missing required field",
        });
      }

      const post = await PostService.createPost({
        title,
        userId,
        description,
      });

      return res.status(201).json({
        postId: post.id,
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getPost(req: AuthRequest, res: Response) {
    try {
      const { postId } = req.params as { postId: string };

      if (!postId) {
        return res.status(400).json({
          error: "Missing postId",
        });
      }

      const post = await PostService.getPost(postId);

      return res.status(201).json(post);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "Failed to get post",
      });
    }
  }
}
