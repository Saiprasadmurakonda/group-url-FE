import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = 'https://localhost:7131'
  private groupsSubject = new BehaviorSubject<any[]>([]);
  public groups$ = this.groupsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    // Subscribe to auth status changes
    this.authService.authStatus$.subscribe(status => {
      if (!status) {
        // Clear groups data when logged out
        this.resetGroups();
      }
    });
  }

  // Reset groups data
  resetGroups(): void {
    this.groupsSubject.next([]);
  }

  // Get groups from API
  getGroups(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/api/Group/mygroups`)
      .pipe(
        tap(groups => {
          console.log('API response groups:', groups);  // Log the groups data
          this.groupsSubject.next(groups);
        })
      );
  }

  getLinksByGroupId(groupId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/api/Group/group/${groupId}/links`);
  }

  deleteLink(groupId: number, tag: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<any>(
      `https://localhost:7131/deleteLink`,
      {
        headers,
        params: {
          groupId: groupId.toString(),
          tag: tag.toString()
        }
      }
    );
  }

}
