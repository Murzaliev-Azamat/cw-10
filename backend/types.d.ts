export interface OneNews {
  id: number;
  title: string;
  info: string;
  image: string | null;
}

export type OneNewsWithoutId = Omit<OneNews, 'id'>;

export interface OneComment {
  id: number;
  author: string;
  message: string;
  news_id: number;
}

export type OneCommentWithoutId = Omit<OneComment, 'id'>;
