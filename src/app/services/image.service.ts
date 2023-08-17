import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  fetchImage(): Observable<any> {
    return this.http
      .get('https://image.dummyjson.com/512x512/101010', { responseType: 'blob' })
  }

  fetchAnnotations(): Observable<any> {
    return this.http.get('https://dummyjson.com/http/200/[{"id":"a1","radiusX":20,"radiusY":25,"x":50,"y":60}]');
  }
}
