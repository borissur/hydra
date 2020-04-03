import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HelperService } from "../shared/services/helper.service";
import { DIALOG_DEFAULT_CONFIG } from "../shared/config/dialog-config";
import { MatDialog } from "@angular/material";
import { ShoppingCardModalComponent } from "./shopping-card-modal/shopping-card-modal.component";

@Component({
  selector: "hydra-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private helperService: HelperService,
    private dialog: MatDialog
  ) {}

  openShoppingCardModal(): void {
    this.dialog.open(ShoppingCardModalComponent, {
      ...DIALOG_DEFAULT_CONFIG,
    });
  }
}
