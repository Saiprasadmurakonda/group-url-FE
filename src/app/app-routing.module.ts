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
import { IndividualgroupComponent } from './individualgroup/individualgroup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: UpdateExistingGroupComponent},
  { path: 'addgroup', component: AddGroupComponent },
  { path: 'addlink', component: AddLinkComponent },
  { path: 'addlink/:groupId', component: AddLinkComponent },
  { path: 'group-links/:groupId', component: GroupLinksComponent },
  { path: 'viewGroup', component: ViewGroupComponent },
  // { path: 'updateExistingGroup', component: UpdateExistingGroupComponent } ,
  { path: 'updateLinkInExistingGroup/:groupId', component: UpdateLinkInExistingGroupComponent } ,
  { path: 'update-link/:id', component: UpdateLinkComponent }  ,
  { path: 'deleteGroup/:groupId', component: DeleteGroupComponent },
  { path: 'individualgroup', component: IndividualgroupComponent }

 


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
