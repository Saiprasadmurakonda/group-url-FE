import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddLinkComponent } from './add-link/add-link.component';
import { GroupLinksComponent } from './group-links/group-links.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { UpdateExistingGroupComponent } from './update-existing-group/update-existing-group.component';
import { UpdateLinkInExistingGroupComponent } from './update-link-in-existing-group/update-link-in-existing-group.component';
import { UpdateLinkComponent } from './update-link/update-link.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  { path: 'addgroup', component: AddGroupComponent },
  { path: 'addlink/:groupId', component: AddLinkComponent },
  { path: 'group-links/:groupId', component: GroupLinksComponent },
  { path: 'viewGroup', component: ViewGroupComponent },
  { path: 'updateExistingGroup', component: UpdateExistingGroupComponent } ,
  { path: 'updateLinkInExistingGroup/:groupId', component: UpdateLinkInExistingGroupComponent } ,
  { path: 'update-link/:id', component: UpdateLinkComponent }  ,
  { path: 'deleteGroup/:groupId', component: DeleteGroupComponent }   
 


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
