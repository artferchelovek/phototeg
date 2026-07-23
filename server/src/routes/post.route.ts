import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, PostController.createPost);
router.get("/:postId", authMiddleware, PostController.getPost);

export default router;
