import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { group } from './models/group';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl="https://localhost:7087/";
  }

  addGroup(group: any, options: { headers: HttpHeaders }): Observable<any> {
    return this.http.post(this.baseUrl + "api/group", group, options);
  }

  addLink(LinkForPost: { groupId: number; actualLink: string; description: string; }, options: { headers: HttpHeaders; }) {
    return this.http.post(this.baseUrl + "api/Group/addlink", LinkForPost, options);
  }

  deleteGroup(groupId: number, options: any) {
    return this.http.delete(`https://localhost:7087/api/group/delete/${groupId}`, options);
  }
  
}

 

