import {User} from './user.model';

export interface Order {
  list: any;
  date?: Date;
  order?: number;
  user?: User;
  _id?: string;
}
