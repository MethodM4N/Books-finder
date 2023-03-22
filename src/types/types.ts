export interface IBooks {
  items: TBook[];
  totalItems: number;
}

export type TBook = {
  id: string;
  volumeInfo: TVolumeInfo;
};

export type TVolumeInfo = {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  categories: string[];
  imageLinks: { thumbnail: string };
  previewLink: string;
  publishedDate: string | undefined;
};
