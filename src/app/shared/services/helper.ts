import {FormGroup} from '@angular/forms';
import {Product} from '../models/products.model';

export function markAllControlsAsTouched(form: FormGroup): void {
  if (!(form && form.controls)) {
    return;
  }

  const controls = form.controls;
  Object.keys(controls).forEach((name) => {
    const formItem = controls[name] as any;
    if (formItem['controls']) {
      markAllControlsAsTouched(formItem);
    } else {
      controls[name].markAsTouched();
    }
  });
}

export function  filterProductsList(value: string, products): Product[] {
    if (value) {
      return products.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
    }
    return products;
  }


export const positiveIntegerRegExp = new RegExp(/^[1-9]{1}[0-9]*$/);
