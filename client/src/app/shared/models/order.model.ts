import {OrderPosition} from './order-position.model';
import {User} from './user.model';

export interface Order {
  list: OrderPosition[];
  date?: Date;
  order?: number;
  user?: User;
  _id?: string;
}
