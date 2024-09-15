export interface Article {
  pageId: string;
  title: string;
  createdAt: Date;
  thumbnailUrl: string;
  properties: any;
}
export interface MultiSelectOption {
  id: string;
  name: string;
  color: string;
}

export interface PageProperties {
  views: {
    id: string;
    type: "number";
    number: number | null;
  };
}
