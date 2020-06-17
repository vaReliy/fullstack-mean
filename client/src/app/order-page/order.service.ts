import {Injectable} from '@angular/core';

import {OrderPosition} from '../shared/models/order-position.model';
import {Position} from '../shared/models/position.model';

@Injectable()
export class OrderService {
  list: OrderPosition[] = [];
  price = 0;

  add(position: Position) {
    const { name, quantity, cost, _id } = position;
    const orderPosition: OrderPosition = {
      name,
      quantity,
      cost,
      _id,
    };

    const existedPosition = this.list.find(item => item._id === orderPosition._id );
    if (existedPosition) {
      existedPosition.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.computePrice();
  }

  remove(position: OrderPosition) {
    const targetIndex = this.list.findIndex(item => item._id === position._id);
    if (targetIndex >= 0) {
      this.list.splice(targetIndex, 1);
      this.computePrice();
    }
  }

  reset() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      total += item.quantity * item.cost;
      return total;
    }, 0);
  }
}
