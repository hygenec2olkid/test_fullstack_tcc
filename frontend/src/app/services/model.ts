import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentData } from '../components/qrcodeModal/qrcode.component';
import { ConfirmModal } from '../components/confirmModal/qrcode.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openConfimrDialog(productNo: string) {
    return this.dialog.open(ConfirmModal, {
      data: {
        productNo: productNo,
      },
    });
  }

  openQrDialog(productNo: string) {
    return this.dialog.open(ModalComponentData, {
      data: {
        productNo: productNo,
      },
    });
  }
}
