import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {Category} from "../../shared/models/category.model";
import {MaterializeService} from "../../shared/services/materialize.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  private _category: Category;
  imageUrl: string;
  form = this.fb.group({
    name: this.fb.control(null, Validators.required),
  }, { enabled: false });

  @Input()
  set category(value: Category) {
    this._category = value;
    this.initialize();
  }

  get category(): Category {
    return this._category;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  initialize() {
    if (this._category) {
      this.imageUrl = this._category.imageSrc;
      this.form.patchValue({
        name: this._category.name,
      });
      MaterializeService.updateTextFields();
    }
  }

  onSubmit() {
    console.log('onSubmit'); // fixme
  }

  onRemove() {
    console.log('onRemove'); // fixme
  }

  onImageUpload() {
    console.log('onImageUpload'); // fixme
  }

}
