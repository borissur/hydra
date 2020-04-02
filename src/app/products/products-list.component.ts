import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ProductsService } from "../shared/services/products.service";
import { Observable, Subscription } from "rxjs";
import { Product } from "../shared/models/products.model";
import { FormControl } from "@angular/forms";
import { map, startWith, switchMap } from "rxjs/operators";
import { HelperService } from "../shared/services/helper.service";
import { MatDialog } from "@angular/material";
import { DIALOG_DEFAULT_CONFIG } from "../shared/config/dialog-config";
import { filterProductsList } from "../shared/services/helper";
import { AddProductModalComponent } from "./add-product-modal/add-product-modal.component";

@Component({
  selector: "hydra-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
  providers: [ProductsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
  productsList$: Observable<Product[]>;
  productSearchControl: FormControl = new FormControl("");
  subscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private helperService: HelperService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.productsService
      .getProducts()
      .pipe(
        switchMap((products: Product[]) => {
          this.updateProductsList(products);
          return this.helperService.productsList$;
        })
      )
      .subscribe((products: Product[]) => {
        this.initProductsList(products);
      });
  }

  openModalAddProduct(product: Product): void {
    this.dialog.open(AddProductModalComponent, {
      ...DIALOG_DEFAULT_CONFIG,
      data: product,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initProductsList(products): void {
    this.productsList$ = this.productSearchControl.valueChanges.pipe(
      startWith(""),
      map((value) => filterProductsList(value, products))
    );
    this.cdr.detectChanges();
  }

  private updateProductsList(products) {
    this.helperService.updateProductsList(products);
  }
}
