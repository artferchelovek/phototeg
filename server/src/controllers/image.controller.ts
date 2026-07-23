import "dotenv/config";
import { Request, Response } from "express";
import { extractImages, getLink } from "../utils/parseImages";
import { ImageService } from "../services/image.service";
import { AuthRequest } from "../middleware/auth.middleware";

const OAUTH_TOKEN = process.env.OAUTH_TOKEN;

export interface DiskResponse {
  name: string;
  _embedded: {
    items: DiskImage[];
  };
}

interface DiskImage {
  name: string;
  type: "file";
  sizes: DismImageSize[];
}

interface DismImageSize {
  name: string;
  url: string;
}

export class ImageController {
  static async uploadImages(req: AuthRequest, res: Response) {
    try {
      const { diskLink, postId } = req.body;

      if (!diskLink) {
        res.status(400).json({ error: "disk link is required" });
      }

      const encodedDiskLink = getLink(diskLink);

      const response = await fetch(encodedDiskLink, {
        headers: {
          Authorization: `OAuth ${OAUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        res.status(500).json({ error: "failed to fetch images" });
      }

      const data: DiskResponse = await response.json();

      const extractedDiskImages = extractImages(data);

      if (extractedDiskImages.length === 0) {
        return res.status(404).json({
          error: "No images found in the disk folder",
        });
      }

      const images = await ImageService.addImage(extractedDiskImages, postId);

      return res.status(200).json(images);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "failed to upload image",
      });
    }
  }

  static async deleteImages(req: AuthRequest, res: Response) {
    try {
      const { postId } = req.body;

      if (!postId) {
        res.status(400).json({ error: "postId is required" });
      }

      const deletedImages = await ImageService.deleteImagesFromPost(postId);

      return res.status(200).json(deletedImages);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "failed to delete image",
      });
    }
  }
}
