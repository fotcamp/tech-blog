export interface Article {
  pageId: string;
  title: string;
  createdAt: Date;
  thumbnailUrl: string;
  properties: PageProperties;
  showCreatedAt?: boolean;
  showRole?: boolean;
}

export interface MultiSelectOption {
  id: string;
  name: string;
  color: string;
}

export interface SelectOption {
  id: string;
  name: string;
  color: string;
}

export interface PageProperties {
  role?: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelectOption[];
  };
  exposure?: {
    id: string;
    type: "checkbox";
    checkbox: boolean;
  };
  writer?: {
    id: string;
    type: "select";
    select: SelectOption | null;
  };
  status?: {
    id: string;
    type: "status";
    status: SelectOption | null;
  };
  views?: {
    id: string;
    type: "number";
    number: number | null;
  };
  name?: {
    id: string;
    type: "title";
    title: { type: "text"; text: { content: string; link: null } }[];
  };
}
