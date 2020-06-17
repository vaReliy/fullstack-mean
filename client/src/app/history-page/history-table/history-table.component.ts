import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Order} from '../../shared/models/order.model';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit {
  @Input() orderList: Order[];
  @Output() showOrderDetails = new EventEmitter<Order>();

  constructor() { }

  ngOnInit() {
  }

  getOrderPrice(order: Order) { // fixme: not good solution
    return order.list.reduce((total, item) => {
      total += item.cost * item.quantity;
      return total;
    }, 0);
  }
}
