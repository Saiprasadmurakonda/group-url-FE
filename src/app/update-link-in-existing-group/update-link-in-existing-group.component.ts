import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-link-in-existing-group',
  standalone: false,
  templateUrl: './update-link-in-existing-group.component.html',
  styleUrl: './update-link-in-existing-group.component.css'
})
export class UpdateLinkInExistingGroupComponent implements OnInit{

  groupId: number = 0;
  links: any[] = [];
  isLoading = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private httpClient: HttpClient
  ) {}


  

  ngOnInit(): void {
    // Get groupId from route parameters
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
    
    // Fetch the links for the group
    this.fetchGroupLinks();
  }

  fetchGroupLinks() {
    this.groupService.getLinksByGroupId(this.groupId).subscribe(
      (links) => {
        this.links = links;
        console.log(Array.isArray(this.links)); // should be true
        console.log(this.links);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching group links:', error);
        this.isLoading = false;
      }
    );
  }
  updateLink(link :any) {
    console.log(link);
    this.router.navigate(['/update-link', link.id]); 
}
addLink(){
  console.log(this.groupId);
  this.router.navigate(['/addlink',this.groupId]);
}

deleteLink(groupId: number, tag: number): void {
  if(confirm('Are you sure you want to delete this link?')){
    this.groupService.deleteLink(groupId, tag).subscribe(
      (response) => {
        console.log('Link deleted successfully:', response);
        alert('Link deleted successfully');
        // Optionally, refresh the links after deletion
        this.fetchGroupLinks();
      }, 
      (error) => {
        console.error('Error deleting link:', error);
        // Handle error if needed
      }
    );
  }
}

}


