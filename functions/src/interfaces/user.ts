export interface User {
  uid: string;
  name: string;
  avaterURL: string;
  email: string;
  createdAt: Date;
  admin: boolean;
  eatCount: number;
  isEatenBreakfast: boolean;
  isEatenLunch: boolean;
  isEatenDinner: boolean;
}
