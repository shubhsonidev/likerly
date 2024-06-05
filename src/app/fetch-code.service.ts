import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchCodeService {
  constructor(private http: HttpClient) {}

  fetchData(payload: any): Observable<any> {
    return this.http.get<any>(
      'https://script.google.com/macros/s/AKfycbyopRx0C0RRkdKVagX7YcaBT32L-2Ksp1xomG2YZC9rAlGkCG8bBKvewAoztX5wmtdO3Q/exec?apifor=add&redirect_url=' +
        payload.redirect_url
    );
  }
}
