export type ApiResponse = {
  data: {
    query: string;
    tags: string[];
  };
};

export type Content = {
  title: string;
  description: string;
};

export type ContentData = Content[];
