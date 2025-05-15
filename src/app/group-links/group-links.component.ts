import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-links',
  standalone: true, 
  templateUrl: './group-links.component.html',
  imports: [CommonModule],
  styleUrls: ['./group-links.component.css']
})
export class GroupLinksComponent implements OnInit {
  groupId: number = 0;
  links: any[] = [];
  isLoading = true;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    // Get groupId from route parameters
    if(this.route.snapshot.paramMap.get('groupId') !== null){
      this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
    }
    else{
      this.groupId = 0;
    }
    
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
  updateLink() {
    console.log('Link'); // ✅ Check if this logs a valid ID
  // this.router.navigate(['/group-links', groupId]);
}
addLink(){
  this.router.navigate(['/add-link', this.groupId]);
}

}
