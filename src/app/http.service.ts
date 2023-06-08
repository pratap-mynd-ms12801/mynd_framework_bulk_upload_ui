import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  public getData(url: string, payload:any, ): Observable<any> {
    
      const headers = new HttpHeaders({
        Authorization: "Bearer " + localStorage.getItem('token'),
      });

    return this.http.post(url,payload, {headers});
  }

}
