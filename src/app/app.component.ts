import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SW';
  origin = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.origin = params['origin'];
    });
  }

  goToCart() {
    if (this.router.url.split('/')[1] !== 'mycart') {
      this.router.navigate(['/mycart', '/']);
    }
  }
}
