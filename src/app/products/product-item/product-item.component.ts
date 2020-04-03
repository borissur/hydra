import { Component, Input, OnInit } from "@angular/core";
import {
  AddSelectedProductForm,
  Product,
} from "../../shared/models/products.model";
import { FormBuilder } from "@angular/forms";
import { HelperService } from "../../shared/services/helper.service";
import { ConfirmationModalComponent } from "../../shared/components/confirmation-modal/confirmation-modal.component";
import { DialogSize } from "../../shared/config/dialog-config";
import { MatDialog } from "@angular/material";

@Component({
  selector: "hydra-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() productForm;
  @Input() product: Product;
  @Input() isShoppingCard = false;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.productForm) {
      this.productForm = this.fb.group(
        new AddSelectedProductForm(
          this.product.amount ? new Product(this.product) : new Product()
        )
      );
    }
  }

  valueChanged() {
    if (this.isShoppingCard && this.productForm.valid) {
      this.product.amount = this.productForm.value.amount;
      this.helperService.updateProductsListAfterChangeAmountOfProduct(
        this.product
      );
    }
  }

  openConfirmationModal() {
    this.dialog
      .open(ConfirmationModalComponent, {
        width: DialogSize.sm,
        autoFocus: false,
        data: "Вы уверены, что хотите удалить этот элемнет?",
      })
      .afterClosed()
      .subscribe((flag: boolean) => {
        if (flag) {
          this.helperService.deleteProductItem(this.product);
        }
      });
  }
}
