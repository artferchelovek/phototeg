import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/upload", authMiddleware, ImageController.uploadImages);
router.delete("/delete", authMiddleware, ImageController.deleteImages);

export default router;
