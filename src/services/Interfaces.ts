type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any);

export type DataTableHeader = {
  key: string;
  value?: SelectItemKey;
  title: string;
  colspan?: number;
  rowspan?: number;
  fixed?: boolean;
  align?: "start" | "end" | "center";
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  sort?: DataTableCompareFunction;
};
export interface ThumbnailItem {
  id?: string;
  title?: string;
  name?: {
    common: string;
    native: string;
  };
  url?: string;
  thumbnail?: string;
  category?: string;
  subcategory?: {
    id?: string;
    title?: string;
    url?: string;
  }[];
}

export interface Categories {
  title: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  state: boolean;
}

export interface UserItem {
  id: number;
  email: string;
  name1: {
    first: string;
    last: string;
  };
  name2: {
    first: string;
    last: string;
  };
  member: number;
  company: string;
  code: string;
  favorites: string;
  state: boolean;
  role: boolean;
  accessedAt: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  thumbnail: string;
  state: boolean;
}

export interface SubCategoryItem {
  id: number;
  name: string;
  categoryname: string;
  state: boolean;
}

export interface TagItem {
  id: number;
  name: string;
  thumbnail: string;
  categoryname: string;
  subcategoryname: string;
  state: boolean;
}

export interface CreatorItem {
  id: number;
  name: string;
  age: number;
  thumbnail: string;
  state: boolean;
}

export interface CreativeItem {
  id: number;
  state: boolean;
  resolution: object;
  rank: string;
  file: string;
  creatorname: string;
  tagname: string;
}

export interface MembershipItem {
  membership: string;
  membership_start: string;
  membership_end: string;
}