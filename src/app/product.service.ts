import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any[] = [];

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('http://localhost:3000/products')
  }
  
  getProduct() {
    return this.products
  }

  saveToCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.products))
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveToCart ();
  }

  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveToCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }
}
