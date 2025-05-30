import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  url = 'https://localhost:7087'

  constructor(private http:HttpClient) { }
  getLinkById(id: any): Observable<any> {

    return this.http.get(`${this.url}/api/Group/link/${id}`);
  }
  
  updateLink(data: any): Observable<any> {
    console.log("Before put", data);
    return this.http.put(`${this.url}/api/Group/link/${data.id}`, data);
  }

}

