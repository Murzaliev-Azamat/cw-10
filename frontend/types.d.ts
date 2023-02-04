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