import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {CategoryFormData} from "../../shared/models/category-form-data.model";
import {Category} from "../../shared/models/category.model";
import {MaterializeService} from "../../shared/services/materialize.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  @Output() categoryUpdate = new EventEmitter<CategoryFormData>();
  @Output() categoryRemove = new EventEmitter();
  imageFile: File;
  imageUrl: string | ArrayBuffer;
  form = this.fb.group({
    name: this.fb.control(null, Validators.required),
  }, { enabled: false });
  private _category: Category;

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
    this.form.enable();
  }

  onSubmit() {
    this.form.disable();
    const categoryFD: CategoryFormData = {
      name: this.form.get('name').value,
      image: this.imageFile,
    };
    this.categoryUpdate.emit(categoryFD);
  }

  onRemove() {
    const decisionToRemove = window.confirm(`Ви дійсно бажаєте видалити категорію ${this._category.name}?`);
    if (decisionToRemove) {
      this.categoryRemove.emit();
    }
  }

  onImageUpload(htmlElement: HTMLElement) {
    htmlElement.click();
  }

  onImageUploadComplete(event: Event) {
    const files = event.target['files'];
    if (files) {
      this.imageFile = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
      reader.readAsDataURL(this.imageFile);
    }
  }
}
