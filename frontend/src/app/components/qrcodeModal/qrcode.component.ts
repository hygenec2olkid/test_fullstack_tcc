import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'modal-qr-component',
  imports: [QRCodeComponent],
  templateUrl: 'qrcode.component.html',
})
export class ModalComponentData {
  constructor(
    public dialogRef: MatDialogRef<ModalComponentData>,
    @Inject(MAT_DIALOG_DATA) public data: { productNo: string }
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
}
