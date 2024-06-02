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
      'https://script.google.com/macros/s/AKfycbw5ooH_qeM89P5DJHuUDaDKG7qqNyKiQPrxbrh-3OgJfg-PFQTJv6D9Gd6j06UkCw61xA/exec?apifor=add&redirect_url=' +
        payload.redirect_url
    );
  }
}
