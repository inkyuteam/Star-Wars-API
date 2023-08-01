import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  isLoading: boolean = false;
  origin: string = '';
  cartItems: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.origin = params['origin'];
    });
  }

  backList() {
    this.router.navigateByUrl(this.origin);
  }

  backHome() {
    this.router.navigate(['/']);
  }

  redirectToDetailPage(isLoading: boolean, product: any) {
    if(isLoading) return;
    this.router.navigate(['/detail', product.url, this.router.url]);
  }

  deleteFromCart(product: any) {
    this.cartService.deleteProduct(product);
    this.cartItems = this.cartService.getCartItems();
  }

  handleImageError(product: any) {
    product['imageUrl'] = 'assets/images/no_image.png';
  }
}
