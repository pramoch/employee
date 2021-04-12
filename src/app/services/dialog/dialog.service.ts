import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent, DialogData } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  showConfirm(data: DialogData): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    return dialogRef.afterClosed();
  }
}
