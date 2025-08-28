import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  get<T>(path: String): Observable<T> {
    return this.http.get<T>(this.apiUrl + path);
  }

  post<T>(path: String, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + path, body);
  }

  delete<T>(path: String): Observable<T> {
    return this.http.delete<T>(this.apiUrl + path);
  }
}
