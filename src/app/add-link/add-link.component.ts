import { Component, OnInit } from '@angular/core';
import { link } from '../models/link';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'app-add-link',
  standalone: false,
  templateUrl: './add-link.component.html',
  styleUrl: './add-link.component.css'
})
export class AddLinkComponent implements OnInit {
link: link ;
groupId: number = 0;
  constructor(private service: ApiCallService, private route: ActivatedRoute,private router: Router) {
    
    const helper= this.getUserDetails()
    this.link = { id:0, groupId:0, actualLink: "",  description:""};
  }
  ngOnInit(): void {
    // Get groupId from route parameters
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
    
  }
addLink() {
  console.log('Token is ', localStorage.getItem('token'));
    const helper = this.getUserDetails();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${helper.token}`
    });
    const options = { headers };  // Wrapping headers in an options object
    let {...LinkForPost } = this.link;
    LinkForPost.groupId=this.groupId;
    // Now send `expenseForPost` in your POST request
    
    this.service.addLink(LinkForPost, options).subscribe((response: any)=>{
      console.log('SUCCESS');
      console.log(response);
      window.alert("Link Added")
      // this.router.navigate(['view-all-expenses'])
    },(error: any)=>{console.log(error);});

}

getUserDetails() {
  return {
    
    token: localStorage.getItem('token'),
    id: Number(localStorage.getItem('id'))
  };
}

}
