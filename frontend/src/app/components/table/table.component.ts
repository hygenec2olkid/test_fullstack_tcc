import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/model';

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  products = input<{ id: number; product_no: string }[]>([]);
  onDeleteEmit = output<{ productNo: string; id: number }>();

  constructor(private modal: ModalService) {}

  onViewQR(productNo: string) {
    this.modal.openQrDialog(productNo);
  }

  onDelete(productNo: string, id: number) {
    this.onDeleteEmit.emit({ id, productNo });
  }

  displayProduct(product: string): string {
    if (!product) return '';

    const clean = product.replace(/[^a-zA-Z0-9]/g, '');

    return clean.match(/.{1,6}/g)?.join('-') ?? product;
  }
}
