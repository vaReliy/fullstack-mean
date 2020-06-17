import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {OrderPosition} from '../shared/models/order-position.model';
import {Order} from '../shared/models/order.model';
import {MaterializeService, ModalInstance} from '../shared/services/materialize.service';
import {OrdersService} from '../shared/services/orders.service';
import {OrderService} from './order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalWindow', { static: true }) modalRef: ElementRef;
  pending = false;
  isRoot = true;
  private _modal: ModalInstance;

  constructor(
    public order: OrderService,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit(): void {
    this._modal = MaterializeService.modalInit(this.modalRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._modal.destroy();
  }

  showOrder() {
    this._modal.open();
  }

  hideOrder() {
    this._modal.close();
  }

  removeOrderPosition(position: OrderPosition) {
    this.order.remove(position);
  }

  applyOrder() {
    this.pending = true;
    this.ordersService.create(this.order.list).subscribe(
      (order: Order) => {
        MaterializeService.showMessage(`Замовлення №${order.order} успішно створено!`);
      },
      error => MaterializeService.showErrorMessage(error.error.message),
      () => {
        this._modal.close();
        this.order.reset();
        this.pending = false;
      },
    );
  }
}
