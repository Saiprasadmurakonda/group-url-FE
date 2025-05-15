import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-individualgroup',
  standalone: false,
  templateUrl: './individualgroup.component.html',
  styleUrl: './individualgroup.component.css'
})
export class IndividualgroupComponent {

  group: any;
  links: any[] = [];
  url: string = 'https://localhost:7131/';
  groupurl: string = '';
  noLinksFound: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: GroupService) {}

  ngOnInit() {
    this.group = history.state.group;
    console.log('Individual group', this.group);
    this.groupurl = this.group.groupurl;

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
