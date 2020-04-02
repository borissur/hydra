import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { apiUrl } from "../../../environments/environment";
import { Product } from "../models/products.model";

export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/products`);
  }
}
