export interface OneNews {
  id: number;
  title: string;
  info: string;
  image: string | null;
}

export interface OneNewsApi {
  title: string;
  info: string;
  image: File | null;
}

export interface Comment {
  id: number;
  news_id: number;
  author: string;
  message: string;
}

export interface CommentApi {
  news_id: number;
  author: string;
  message: string;
}
