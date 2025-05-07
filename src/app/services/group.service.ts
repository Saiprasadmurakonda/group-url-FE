import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
          this.groupsSubject.next(groups);
        })
      );
  }
}
