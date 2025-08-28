import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { RequestService } from './services/request';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/model';

@Component({
  selector: 'app-root',
  imports: [TableComponent, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  products = signal<{ id: number; product_no: string }[]>([]);
  productNo = '';

  constructor(private requestService: RequestService, private modal: ModalService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.requestService.get<{ id: number; product_no: string }[]>('/products').subscribe((data) => {
      this.products.set(data);
    });
  }

  onAddProduct(productNo: string) {
    this.requestService.post<String>('/products', { product_no: productNo }).subscribe((data) => {
      console.log(data);
      this.productNo = '';
      this.fetchProducts();
    });
  }

  onDelete(data: { productNo: string; id: number }) {
    const ref = this.modal.openConfimrDialog(data.productNo);

    ref.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.requestService.delete<String>(`/products/${data.id}`).subscribe((data) => {
          console.log(data);
          this.fetchProducts();
        });
      }
    });
  }
}
