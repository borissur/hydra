import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HelperService } from '../../shared/services/helper.service';
import { DialogSize } from '../../shared/config/dialog-config';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: "hydra-shopping-card-modal",
  templateUrl: "./shopping-card-modal.component.html",
  styleUrls: ["./shopping-card-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCardModalComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(
    private helperService: HelperService,
    private dialogRef: MatDialogRef<ShoppingCardModalComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub = this.helperService.productsInShoppingCartLength$.subscribe(
      (length: number) => {
        if (!length) {
          this.closeDialog();
        }
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openConfirmationModalDeleteAll(): void {
    this.dialog
      .open(ConfirmationModalComponent, {
        width: DialogSize.sm,
        autoFocus: false,
        data: "Вы уверены, что хотите удалить все?",
      })
      .afterClosed()
      .subscribe((flag: boolean) => {
        if (flag) {
          this.helperService.setInitialStateProductsList();
        }
        this.closeDialog();
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
