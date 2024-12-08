import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInterface } from '../interface/datainterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(searchValue: string): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(
      `https://gateway.kinguin.net/offer/api/v2/offers/findActiveOffers/${searchValue}`,
      {
        headers: new HttpHeaders({
          'x-test': environment.test,
        }),
      }
    );
  }

  // -- FUNCTION USED TO WORK ON THE TEST API --
  // getData(searchValue: string): Observable<JsonPlaceholder[]> {
  //   return this.http.get<JsonPlaceholder[]>(
  //     `https://jsonplaceholder.typicode.com/todos/${searchValue}`,
  //     {
  //       headers: new HttpHeaders({
  //         'x-test': environment.test,
  //       }),
  //     }
  //   );
  // }
}
