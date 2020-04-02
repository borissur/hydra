import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/products.model";
import { filter, map, pluck } from "rxjs/operators";
import { log } from "util";

export class HelperService {
  productsList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    null
  );

  productsInShoppingCart$: Observable<Product[]> = this.productsList$.pipe(
    filter(Boolean),
    map((products: Product[]) => {
      return products.filter((product) => product.amount);
    })
  );

  productsInShoppingCartLength$: Observable<
    number
  > = this.productsInShoppingCart$.pipe(pluck("length"));

  updateProductsList(products): void {
    this.productsList$.next(products);
  }

  updateProductsListAfterChangeAmountOfProduct(updateProduct): void {
    const productsList = this.productList;
    const changeProduct: Product = productsList.find(
      (item: Product) => item.id === updateProduct.id
    );

    changeProduct.amount = updateProduct.amount;
    this.updateProductsList(productsList);
  }

  deleteProductItem(product: Product): void {
    const productsList = this.productList;
    const changeProduct: Product = productsList.find(
      (item: Product) => item.id === product.id
    );

    changeProduct.amount = 0;
    this.updateProductsList(productsList);
  }

  setInitialStateProductsList(): void {
    const productsList = this.productList;
    productsList.forEach((product: Product) => {
      delete product.amount;
    });
    this.productsList$.next(productsList);
  }

  get productList() {
    return this.productsList$.value;
  }
}
