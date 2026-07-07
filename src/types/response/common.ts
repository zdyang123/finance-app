export interface CommonRes<T> {
  code: number;
  message: string;
  data: T;
}