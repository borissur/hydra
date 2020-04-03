import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  AddSelectedProductForm,
  Product,
} from "../../shared/models/products.model";
import { HelperService } from "../../shared/services/helper.service";

@Component({
  selector: "hydra-add-product-model",
  templateUrl: "./add-product-modal.component.html",
  styleUrls: ["./add-product-modal.component.scss"],
})
export class AddProductModalComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<AddProductModalComponent>,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.addProductForm = this.fb.group(
      new AddSelectedProductForm(
        this.data.amount ? new Product(this.data) : new Product()
      )
    );
  }

  closeDialog(amount?: number): void {
    if (amount) {
      this.data.amount = amount;
      this.helperService.updateProductsListAfterChangeAmountOfProduct(
        this.data
      );
    }
    this.dialogRef.close(amount);
  }
}
