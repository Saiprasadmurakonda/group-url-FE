import { Component } from '@angular/core';
import { group } from '../models/group';

// import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'app-add-group',
  standalone: false,
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {
  // groupId, userId, groupName, groupURL, counterValue, groupDescription
  group: group ;
  constructor(private service: ApiCallService, private router: Router) {
    const helper= this.getUserDetails()
    this.group = { groupId: 0, groupName: "",  groupDescription:""};
  }

addGroup() {
  console.log('Token is ', localStorage.getItem('token'));
    const helper = this.getUserDetails();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${helper.token}`
    });
    const options = { headers };  // Wrapping headers in an options object
    let {...groupForPost } = this.group;
    // Now send `expenseForPost` in your POST request
    
    this.service.addGroup(groupForPost, options).subscribe((response: any)=>{
      console.log('SUCCESS');
      console.log(response);
      window.alert("Group Added")
      this.router.navigate(['/home'])
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

  
  // addExpense(){
  //   console.log('Token is ', localStorage.getItem('token'));
  //   const helper = this.getUserDetails();
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${helper.token}`
  //   });
  //   const options = { headers };  // Wrapping headers in an options object
  //   let { id, ...expenseForPost } = this.expense;
  //   // Now send `expenseForPost` in your POST request
    
  //   this.service.addExpense(expenseForPost, options).subscribe((response: any)=>{
  //     console.log('SUCCESS');
  //     console.log(response);
  //     window.alert("Expense Added")
  //     this.router.navigate(['view-all-expenses'])
  //   },(error: any)=>{console.log(error);});
  // }

  
