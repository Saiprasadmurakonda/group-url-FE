import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../services/link.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-link',
  standalone: false,
  templateUrl: './update-link.component.html',
  styleUrls: ['./update-link.component.css']
})
export class UpdateLinkComponent implements OnInit {

  linkData = {
    id: '',
    groupId: '',
    actualLink: '',
    description: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id') || '';
    this.route.params.subscribe(params => {
      console.log(params);
      const id = params['id'];
      console.log('Link ID from route:', id); // ✅ Should print the correct ID
    
      this.linkService.getLinkById(id).subscribe(link => {
        this.linkData = link;
        console.log('Fetched link data:', this.linkData); // For debugging

      });
    });
    
    // console.log('Link ID from route:', id);

    // this.linkService.getLinkById(id).subscribe(link => {
    //   this.linkData = link;
    // });
  }

  onSubmit() {
    this.linkService.updateLink(this.linkData).subscribe(() => {
      alert('Link updated!');
      this.router.navigate([`/updateLinkInExistingGroup/${this.linkData.groupId}`])

    });
  }
}
