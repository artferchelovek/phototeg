import { api } from "./api.ts";
import type { AllPost } from "../types/post.ts";

export type FetchPostsResponse =
  { success: true; data: AllPost[] } | { success: false; error?: string };

export type UploadPostResponse =
  | {
      success: true;
    }
  | { success: false; error?: string };

export const fetchAllPosts = async (): Promise<FetchPostsResponse> => {
  try {
    const res = await api.get<AllPost[]>("/post");

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
    };
  }
};

export const uploadPost = async ({
  title,
  description,
  diskLink,
}: {
  title: string;
  description: string;
  diskLink: string;
}): Promise<UploadPostResponse> => {
  try {
    const post = await api.post("/post/create", {
      title,
      description,
      diskLink,
    });

    const postId = post.data.postId;

    await api.post("/image/upload", {
      postId,
      diskLink,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
    };
  }
};
