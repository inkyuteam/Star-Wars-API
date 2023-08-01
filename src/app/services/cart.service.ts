import { Injectable } from '@angular/core';
import { SalesService } from './sales.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private salesService: SalesService) { }

  private cartItems: any[] = [];

  addToCart(product: any, quentity: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].url == product.url) {
        this.cartItems[i]['quentity'] = this.cartItems[i]['quentity'] + quentity;
        this.cartItems[i]['sales'] = this.salesService.calculateSalePrice(this.cartItems[i].url, this.cartItems[i].cost_in_credits);

        return;
      }
    }
    product['quentity'] = quentity;
    product['sales'] = this.salesService.calculateSalePrice(product.url, product.cost_in_credits);
    this.cartItems.push(product);
  }

  deleteProduct(product: any) {
    this.cartItems = this.cartItems.filter((item) => item.url != product.url);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
