import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core'; // import this if not already


@Component({
  selector: 'app-delete-group',
  standalone: false,
  templateUrl: './delete-group.component.html'
})
export class DeleteGroupComponent {
  groupId: number = 0;

  constructor(private route: ActivatedRoute, private service: ApiCallService,private zone: NgZone, private router: Router) {
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
  }


  
  deleteGroup() {
    if (confirm('Are you sure you want to delete this group and all associated links?')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const options = { headers };
  
      this.service.deleteGroup(this.groupId, options).subscribe(() => {
        alert('Group deleted successfully.');
        
        // Run navigation in Angular's zone to ensure the route changes correctly
        this.zone.run(() => {
          this.router.navigate(['/updateExistingGroup']);
        });
  
      }, (error: any) => {
        console.error(error);
        alert('Failed to delete group');
      });
    }
  }
  
}
