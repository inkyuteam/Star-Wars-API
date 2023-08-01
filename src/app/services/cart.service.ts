import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItems: any[] = [];

  addToCart(product: any, quentity: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].url == product.url) {
        this.cartItems[i]['quentity'] = this.cartItems[i]['quentity'] + quentity;

        return;
      }
    }
    product['quentity'] = quentity;
    this.cartItems.push(product);
  }

  deleteProduct(product: any) {
    this.cartItems = this.cartItems.filter((item) => item.url != product.url);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
