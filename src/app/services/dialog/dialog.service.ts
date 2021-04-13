import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent, DialogData } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  loadingRef!: MatDialogRef<DialogComponent> | null;

  constructor(private dialog: MatDialog) { }

  showConfirm(data: DialogData): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    return dialogRef.afterClosed();
  }

  showError(data: DialogData): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    return dialogRef.afterClosed();
  }

  showLoading(): void {
    this.loadingRef = this.dialog.open(DialogComponent, {
      data: {
        isLoading: true
      }
    });
  }

  hideLoading(): void {
    if (this.loadingRef) {
      this.loadingRef.close();
      this.loadingRef = null;
    }
  }
}
