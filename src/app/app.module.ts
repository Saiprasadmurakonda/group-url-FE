import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddLinkComponent } from './add-link/add-link.component';
import { CommonModule } from '@angular/common';
import { ViewGroupComponent } from './view-group/view-group.component';
import { UpdateExistingGroupComponent } from './update-existing-group/update-existing-group.component';
import { UpdateLinkInExistingGroupComponent } from './update-link-in-existing-group/update-link-in-existing-group.component';
import { UpdateLinkComponent } from './update-link/update-link.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndividualgroupComponent } from './individualgroup/individualgroup.component';
// import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddGroupComponent,
    AddLinkComponent,
    ViewGroupComponent,
    UpdateExistingGroupComponent,
    UpdateLinkInExistingGroupComponent,
    UpdateLinkComponent,
    DeleteGroupComponent,
    NavbarComponent,
    IndividualgroupComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
