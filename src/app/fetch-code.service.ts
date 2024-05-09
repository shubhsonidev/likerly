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
      'https://script.google.com/macros/s/AKfycbzrbXAn36Vm4NTJpqsi2F4FWybUbJjFKIMc89X-tw0GzMlAsV0gy00c-nRkMtva3KJbag/exec?redirect_url=' +
        payload.redirect_url
    );
  }
}
