import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../api-call.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-existing-group',
  standalone: false,
  templateUrl: './update-existing-group.component.html',
  styleUrl: './update-existing-group.component.css'
})
export class UpdateExistingGroupComponent {

  isLoggedIn = false;
  groups: any[] = [];
  private authSubscription!: Subscription;
  private groupsSubscription!: Subscription;

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private router: Router,
    private service: ApiCallService,
    private zone: NgZone
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

    this.router.navigate(['/updateLinkInExistingGroup', groupId]);

  }
  
  // deleteGroup(groupId: number){
  //   this.router.navigate(['/deleteGroup', groupId]);
  // }

  // deleteGroup(groupId: number) {
  //   if (confirm('Are you sure you want to delete this group and all associated links?')) {
  //     const token = localStorage.getItem('token');
  //     const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  //     const options = { headers };
  
  //     this.service.deleteGroup(groupId, options).subscribe(() => {
  //       alert('Group deleted successfully.');
        
  //       // Run navigation in Angular's zone to ensure the route changes correctly
  //       this.zone.run(() => {
  //         this.router.navigate(['/home']);
  //       });
  
  //     }, (error: any) => {
  //       console.error(error);
  //       alert('Failed to delete group');
  //     });
  //   }
  // }

  deleteGroup(groupId: number) {
    if (confirm('Are you sure you want to delete this group and all associated links?')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const options = { headers };
  
      this.service.deleteGroup(groupId, options).subscribe(() => {
        alert('Group deleted successfully.');
        this.fetchGroups(); // 👈 Refresh the group list here
      }, (error: any) => {
        console.error(error);
        alert('Failed to delete group');
      });
    }
  }
  


  viewIndividualGroup(group: any){
    console.log('From update', group);
    this.router.navigate(['/individualgroup'], { state: { group: group } });
  }

  logout() {
    this.authService.logout();
  }
}