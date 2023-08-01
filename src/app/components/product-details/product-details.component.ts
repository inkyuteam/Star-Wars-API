import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  url: string = '';
  product: any;
  type: 'vehicles' | 'starships' = 'vehicles';
  id: number = 0;
  isLoading: boolean = false;
  objectKeys: string[] = [];
  origin: string = '';
  quentity: number = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private cartService: CartService, private salesService: SalesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.url = params['url'];
      this.origin = params['origin'];
      const parts = this.url.split('/');
      this.id = parseInt(parts[parts.length - 2]);
      this.type = parts[parts.length - 3] as 'vehicles' | 'starships';
      this.fetchProduct();
    });
  }

  fetchProduct() {
    this.isLoading = true;
    this.apiService.getProduct(this.type, this.id).subscribe(
      (response) => {
        this.isLoading = false;
        this.product = response;
        this.objectKeys = Object.keys(this.product);
        this.product['imageUrl'] = `assets/images/${this.type}/${this.id}.jpg`;
        this.product['sales'] = this.salesService.calculateSalePrice(this.product.url, this.product.cost_in_credits);

      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    );
  }

  handleImageError(product: any) {
    product['imageUrl'] = 'assets/images/no_image.png';
  }

  backList() {
    this.router.navigateByUrl(this.origin);
  }

  backHome() {
    this.router.navigate(['/']);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quentity);
    this.router.navigate(['/mycart', this.router.url]);
  }
}
