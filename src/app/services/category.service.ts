import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private buttonTextSubject = new Subject<'vehicles' | 'starships'>();
  buttonText$ = this.buttonTextSubject.asObservable();

  private buttonText: 'vehicles' | 'starships' = 'vehicles';

  getButtonText(): 'vehicles' | 'starships' {
    return this.buttonText;
  }

  setButtonText(text: 'vehicles' | 'starships') {
    this.buttonText = text;
    this.buttonTextSubject.next(text);
  }
  
  constructor() { }
}
