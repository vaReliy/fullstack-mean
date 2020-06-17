import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {OrderPosition} from '../models/order-position.model';
import {Order} from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getOrderList(): Observable<Order[]> {
    const url = '/api/order';
    return this.http.get<Order[]>(url);
  }

  create(orderPositions: OrderPosition[]): Observable<Order> {
    const url = '/api/order';
    const body = {
      list: orderPositions.map(p => {
        delete p._id;
        return p;
      }),
    };
    return this.http.post<Order>(url, body);
  }
}
