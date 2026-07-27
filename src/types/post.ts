export interface Image {
  id: string;
  link: string;
  postId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Post {
  id: string;
  title: string;
  description?: string | null;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AllPost extends Post {
  images: Image[];
}
