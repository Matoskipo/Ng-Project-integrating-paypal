import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsArray!: any[];
  products: any[] = [];
  subTotal: any;




  constructor(private prod_service: ProductService, private route:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.prod_service.loadCart();
    this.products = this.prod_service.getProduct()
    console.log('products=> ',this.products)
  }

  getAllProducts() {
    this.prod_service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productsArray = res
        console.log(this.productsArray)
      },
      error: (error) => {
        alert(error)
      },
      complete: () => {
        console.log('Request completed')
      }
    })
  }


  //Add product to Cart
  addCart(product: any) {
    if (!this.prod_service.productInCart(product)) {
      product.quantity = 1;
      this.prod_service.addToCart(product);
      this.products = [...this.prod_service.getProduct()];
      console.log(this.products)
      this.subTotal = product.price;

    }
  }

  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amnt = product.price;
  //   this.prod_service.saveToCart()

  // }

  // remove product from cart
  removeFromCart(product:any) {
    this.prod_service.removeProduct(product)
    this.products = this.prod_service.getProduct()
  }

  // calculate total

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    localStorage.setItem('total_sum', JSON.stringify(this.total))
    this.route.navigate(['/payment'])
  }
}
