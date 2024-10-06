export type ApiResponse = {
  data: {
    query: string;
    tags: string[];
  };
};

export type Content = {
  title: string;
  description: { text: string }[];
};

export type ContentData = Content[];
