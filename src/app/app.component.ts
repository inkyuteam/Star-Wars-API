import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SW';

  constructor(private router: Router) { }

  goToCart() {
    if (!this.router.url.includes('mycart')) {
      this.router.navigate(['/mycart', this.router.url]);
    }
  }
}
