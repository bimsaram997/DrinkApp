import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkServiceService {
  myUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getAlcoholicDrinks(): Observable<any> {
    return this.http.get(`${this.myUrl}/json/v1/1/filter.php?a=Alcoholic`);
  }
  getAlcoholicDrinkById(drinkId: number): Observable<any> {
    return this.http.get(`${this.myUrl}/json/v1/1/lookup.php?i=${drinkId}`);
  }

}
