import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {PositionFormData} from '../../shared/models/position-form-data.model';
import {Position} from '../../shared/models/position.model';
import {MaterialInstance, MaterializeService} from '../../shared/services/materialize.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent implements AfterViewInit, OnDestroy {
  @Output() positionUpdate = new EventEmitter<PositionFormData>();
  @Output() positionRemove = new EventEmitter<string>();
  @ViewChild('modalWindow', { static: true }) modalRef: ElementRef;
  form = this.fb.group({
    name: this.fb.control(null, Validators.required),
    cost: this.fb.control(null, [Validators.required, Validators.min(1)]),
  });
  private _positionList: Position[];
  private _activePositionId: string;
  private _modalInstance: MaterialInstance;

  @Input()
  set positionList(value: Position[]) {
    this.form.enable();
    this.hideModal();
    this._positionList = value;
  }

  get positionList(): Position[] {
    return this._positionList;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngAfterViewInit() {
    this._modalInstance = MaterializeService.modalInit(this.modalRef.nativeElement, {
      onCloseEnd: this.resetModal.bind(this),
    });
  }

  ngOnDestroy(): void {
    this._modalInstance.destroy();
  }

  onPositionRemove(event: Event, position: Position) {
    event.stopPropagation();
    this._activePositionId = position._id;
    const decision = window.confirm(`Ви дійсно бажаєте видалити позицію "${position.name}?"`);
    if (decision) {
      this.positionRemove.emit(position._id);
    }
  }

  onPositionEdit(position: Position) {
    this._activePositionId = position._id;
    this.showModal(position);
  }

  onPositionAdd() {
    this._activePositionId = null;
    this.showModal();
  }

  onModalCancel() {
    this.hideModal();
  }

  onModalConfirm() {
    this.form.disable();
    const position = this.form.getRawValue();
    position._id = this._activePositionId;
    this.positionUpdate.emit(position);
  }

  private showModal(position?: Position) {
    if (position) {
      const { name, cost } = position;
      this.form.patchValue({
        name,
        cost,
      });
      MaterializeService.updateTextFields();
    }
    this._modalInstance.open();
  }

  private hideModal() {
    if (this._modalInstance) {
      this._modalInstance.close();
    }
  }

  private resetModal() {
    this.form.reset();
  }
}
