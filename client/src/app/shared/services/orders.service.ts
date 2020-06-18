import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {OrderPosition} from '../models/order-position.model';
import {Order} from '../models/order.model';
import {PaginationData} from '../models/pagination-data.model';
import {PaginationParams} from '../models/pagination-params.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  static STEP: number = 2;
  static getDefaultPaginationParams(): PaginationParams {
    return {
      skip: 0,
      take: OrdersService.STEP,
      sortBy: 'desc',
    };
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  getOrderList(parameters: PaginationParams): Observable<PaginationData<Order>> {
    const url = '/api/order';
    return this.http.get<PaginationData<Order>>(url, {
      params: new HttpParams({
        fromObject: parameters as any, // fixme type
      }),
    });
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
