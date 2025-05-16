import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../services/link.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  isUpdating: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private location: Location
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

  linkInvalid: boolean = false; // flag to show if link is not reachable

  validateLinkExists(url: string): Promise<boolean> {
    return fetch(url, { method: 'HEAD' })
      .then(response => response.ok)
      .catch(() => false); // catch network errors
  }


  onCancel(){
    // this.router.navigate([`/updateLinkInExistingGroup/${this.linkData.groupId}`])
    this.location.back();
  }

  // onSubmit() {
  //   this.linkService.updateLink(this.linkData).subscribe(() => {
  //     alert('Link updated!');
  //     this.router.navigate([`/updateLinkInExistingGroup/${this.linkData.groupId}`])

  //   });
  // }

async onSubmit() {
  if (!this.linkData.actualLink || !this.linkData.description) {
    alert('Both Link and Description are required.');
    return;
  }

  this.isUpdating = true;
  this.linkInvalid = false;

  // Optional: You can skip frontend URL check now that backend does it
  // const isValid = await this.validateLinkExists(this.linkData.actualLink);
  // if (!isValid) {
  //   this.linkInvalid = true;
  //   return;
  // }

  this.linkService.updateLink(this.linkData).subscribe({
    next: () => {
      alert('Link updated!');
      this.isUpdating = false;  // Stop loading
      this.router.navigate([`/updateLinkInExistingGroup/${this.linkData.groupId}`]);
    },
    error: (err) => {
      console.log("ERROR", err);
      if (err.status === 400) {
        this.linkInvalid = true; // show message below input
        alert(err.error?.message);
        console.log('Link is invalid:', err.error?.message);
        this.isUpdating = false;  // Stop loading
      } else {
        alert('Update failed. Please try again later.');
      }
    },
    complete: () => {
      this.isUpdating = false;  // Stop loading
    }
  });
}



}
