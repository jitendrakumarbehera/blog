import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogAPIService {
  public API_BASE_URL = environment.url;
  constructor(private http: HttpClient) { }


  get(url): Observable<any> {
    return this.http.get(this.API_BASE_URL + url)
  }
  post(url, body): Observable<any> {
    return this.http.post(this.API_BASE_URL + url, body);
  }
}
