import {User} from "./user.model";

export interface Category {
  name: string;
  imageSrc?: string;
  user?: User;
  _id?: string;
}
