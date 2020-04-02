import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
} from "@angular/material";
import { ProductsListComponent } from "./products/products-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductItemComponent } from "./products/product-item/product-item.component";
import { FormDirective } from "./shared/directives/form.directive";
import { HelperService } from "./shared/services/helper.service";
import { HeaderComponent } from "./header/header.component";
import { AddProductModalComponent } from "./products/add-product-modal/add-product-modal.component";
import { ShoppingCardModalComponent } from "./header/shopping-card-modal/shopping-card-modal.component";
import { ConfirmationModalComponent } from "./shared/components/confirmation-modal/confirmation-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductItemComponent,
    FormDirective,
    HeaderComponent,
    AddProductModalComponent,
    ShoppingCardModalComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [HelperService],
  entryComponents: [
    AddProductModalComponent,
    ShoppingCardModalComponent,
    ConfirmationModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
