import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  groups: any[] = [];
  private authSubscription!: Subscription;
  private groupsSubscription!: Subscription;

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to auth status
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      
      if (status) {
        // Only fetch groups when logged in
        this.fetchGroups();
      }
    });

    // Subscribe to groups data
    this.groupsSubscription = this.groupService.groups$.subscribe(groups => {
      this.groups = groups;
    });

    // Initial check
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.fetchGroups();
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  fetchGroups() {
    this.groupService.getGroups().subscribe(
      () => {
        console.log("Fetched groups:", this.groups);
      },
      error => {
        console.error('Error fetching groups:', error);
        if (error.status === 401) {
          this.authService.logout();
        }
      }
    );
  }
  viewGroupLinks(groupId: number) {
      console.log('Navigating to group:', groupId); // ✅ Check if this logs a valid ID

    this.router.navigate(['/group-links', groupId]);
  }
  
  addGroup(){
    this.router.navigate(['/addgroup']);
  }

  updateExistingGroup(){
    this.router.navigate(['/updateExistingGroup']);
  }

  viewGroup(){
    this.router.navigate(['/viewGroup']);
  }

 
  logout() {
    this.authService.logout();
  }
}
