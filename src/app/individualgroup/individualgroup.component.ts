import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-individualgroup',
  standalone: false,
  templateUrl: './individualgroup.component.html',
  styleUrl: './individualgroup.component.css'
})
export class IndividualgroupComponent {

  group: any;
  links: any[] = [];
  url: string = 'https://localhost:7087/';
  groupurl: string = '';
  noLinksFound: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: GroupService, private http: HttpClient) {}

  // ngOnInit() {
  //   console.log("From params group url", this.route.snapshot.paramMap.get('groupurl'));
  //   this.group = history.state.group;
  //   console.log('Individual group', this.group);
  //   this.groupurl = this.group.groupurl;

  //   this.service.getLinksByGroupId(this.group.groupId).subscribe({
  //     next: (links) => {
  //       this.links = links;
  //       this.noLinksFound = this.links.length === 0;
  //       console.log('Links:', this.links);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching links:', error);
  //       this.noLinksFound = true;
  //     }
  //   });
  // }

ngOnInit() {
    const groupUrlFromRoute = this.route.snapshot.paramMap.get('groupurl');
    
    // Check if we have group data from navigation state
    if (history.state.group) {
        this.group = history.state.group;
        this.groupurl = this.group.groupurl;
        this.loadLinks();
    } 
    // If no state data, fetch group by groupurl from route
    else if (groupUrlFromRoute) {
        this.groupurl = groupUrlFromRoute;
        this.loadGroupByUrl(groupUrlFromRoute);
    }
}

loadGroupByUrl(groupUrl: string) {
    this.service.getGroupByUrl(groupUrl).subscribe({
        next: (group) => {
            this.group = group;
            this.loadLinks();
        },
        error: (error) => {
            console.error('Error fetching group:', error);
        }
    });
}

loadLinks() {
    this.service.getLinksByGroupId(this.group.groupId).subscribe({
        next: (links) => {
            this.links = links;
            this.noLinksFound = this.links.length === 0;
            console.log('Links:', this.links);
        },
        error: (error) => {
            console.error('Error fetching links:', error);
            this.noLinksFound = true;
        }
    });
}   

 
}
