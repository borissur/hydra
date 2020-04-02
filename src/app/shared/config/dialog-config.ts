import { MatDialogConfig } from "@angular/material";

export enum DialogSize {
  smd = '550px',
  sm = '450px',
}
export const DIALOG_DEFAULT_CONFIG: MatDialogConfig = {
  width: DialogSize.smd,
  autoFocus: false,
  restoreFocus: false,
  disableClose: true,
};
