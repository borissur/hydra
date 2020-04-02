import { Validators } from "@angular/forms";
import { positiveIntegerRegExp } from "../utils/helper";

export class Product {
  id: number;
  name: string;
  imageUrl: string;
  amount?: number;
  constructor(params?: Product) {
    if (params) {
      Object.assign(this, params);
    }
  }
}

export class AddSelectedProductForm {
  constructor(
    model: Product,
    public amount = [
      model.amount ? model.amount : 0,
      Validators.compose([
        Validators.required,
        Validators.max(9999),
        Validators.pattern(positiveIntegerRegExp),
      ]),
    ]
  ) {}
}
