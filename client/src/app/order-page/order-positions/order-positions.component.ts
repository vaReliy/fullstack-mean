import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {Position} from '../../shared/models/position.model';
import {MaterializeService} from '../../shared/services/materialize.service';
import {PositionsService} from '../../shared/services/positions.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
})
export class OrderPositionsComponent implements OnInit {
  positionList$: Observable<Position[]>;

  constructor(
    private positionsService: PositionsService,
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.positionList$ = this.route.params.pipe(
      switchMap((params: Params) => this.positionsService.getPositionList(params['id'])),
      map((positions: Position[]) => positions.map((p: Position) => {
        p.quantity = 1;
        return p;
      })),
    );
  }

  onAddPosition(position: Position) {
    MaterializeService.showMessage(`Додано х${position.quantity} позицій "${position.name}"`);
    this.orderService.add(position);
  }
}
