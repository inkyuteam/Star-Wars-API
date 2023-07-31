import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private apiStarWars = 'https://swapi.dev/api/';

  getProducts(apiType: 'vehicles' | 'starships', page: number): Observable<any> {
    const apiUrl = `${this.apiStarWars}${apiType}`;
    return this.http.get<any>(`${apiUrl}/?page=${page}`);
  }

  getProduct(apiType: 'vehicles' | 'starships', id: number): Observable<any> {
    const apiUrl = `${this.apiStarWars}${apiType}`;    
    return this.http.get<any>(`${apiUrl}/${id}`);
  }
}
