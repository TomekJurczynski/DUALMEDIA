import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInterface } from '../interface/datainterface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(searchValue: string): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(
      `https://gateway.kinguin.net/offer/api/v2/offers/findActiveOffers/${searchValue}`
    );
  }
}
