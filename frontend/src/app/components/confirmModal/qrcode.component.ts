import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'modal-confirm-component',
  imports: [],
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.css'],
})
export class ConfirmModal {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: { productNo: string }
  ) {}

  closeModal(action:string) {
    this.dialogRef.close(action);
  }

  displayProduct(product: string): string {
    if (!product) return '';

    const clean = product.replace(/[^a-zA-Z0-9]/g, '');

    return clean.match(/.{1,6}/g)?.join('-') ?? product;
  }
}
