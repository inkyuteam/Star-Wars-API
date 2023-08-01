import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private saleItems: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchSaleItems();
  }

  addDurationToDate(originalDate: Date, durationString: string) {
    const durationRegex = /^(\d+)\s+(\w+)$/; // Regex to match the duration string format
    const matches = durationString.match(durationRegex);
    
    if (matches && matches.length === 3) {
      let amount = parseInt(matches[1], 10);
      const unit = matches[2].toLowerCase();

      // Convert the unit to the appropriate method name for date manipulation
      let methodName;
      switch (unit) {
        case 'year':
        case 'years':
          methodName = 'FullYear';
          break;
        case 'month':
        case 'months':
          methodName = 'Month';
          break;
        case 'week':
        case 'weeks':
          methodName = 'Date';
          amount *= 7; // Convert weeks to days
          break;
        case 'day':
        case 'days':
          methodName = 'Date';
          break;
        default:
          throw new Error('Invalid duration unit');
      }

      // Clone the original date to avoid modifying it directly
      const newDate = new Date(originalDate);

      // Use the appropriate Date method to add the duration
      (newDate as any)[`set${methodName}`]((newDate as any)[`get${methodName}`]() + amount);

      return newDate;
    } else {
      return originalDate;
      throw new Error('Invalid duration string format');
    }
  }

  fetchSaleItems(): void {
    this.http.get<any[]>('/assets/sale-items.json').subscribe(
      (data) => {
        this.saleItems = data;
        const nowDate = new Date();
        for (let i = 0; i < this.saleItems.length; i++) {
          this.saleItems[i]['endTime'] = this.addDurationToDate(nowDate, this.saleItems[i].consumables);
        }
      },
      (error) => {
        console.error('Failed to fetch sale items:', error);
      }
    );
  }

  getSaleItems(): Observable<any[]> {
    return of(this.saleItems);
  }

  calculateSalePrice(url: number, regularPrice: number): number {
    const saleItem = this.saleItems.find(item => item.url === url);

    if (saleItem && saleItem.endTime > new Date()) {
      // const salePricePercentage = (saleItem.sales / regularPrice) * 100;
      const salePrice = saleItem.sales;
      return salePrice;
    }

    return regularPrice;
  }
}