export type PostModel = {
  userId: number;
  id: number;
  title: string;
  body: string;
  createdAt: number;
  formattedCreatedAt?: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
