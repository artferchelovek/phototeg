import prisma from "../prisma";

export class ImageService {
  static async addImage(imageLinks: string[], postId: string) {
    const data = imageLinks.map((imageLink) => ({
      postId,
      link: imageLink,
    }));

    const result = await prisma.image.createMany({
      data,
      skipDuplicates: true,
    });

    if (!result) {
      throw new Error(`Failed to add images`);
    }

    return {
      count: result.count,
    };
  }

  static async deleteImagesFromPost(postId: string) {
    const images = await prisma.image.deleteMany({
      where: {
        postId: postId,
      },
    });

    if (!images) {
      throw new Error("Could not delete image");
    }

    return {
      count: images.count,
    };
  }
}
