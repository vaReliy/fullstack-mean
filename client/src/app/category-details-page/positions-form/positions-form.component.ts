import {Component, Input, OnInit} from '@angular/core';

import {Position} from '../../shared/models/position.model';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent implements OnInit {
  @Input() positionList: Position[];

  constructor() { }

  ngOnInit() {
  }

}
