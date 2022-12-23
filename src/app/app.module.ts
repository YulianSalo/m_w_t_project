import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule} from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
import { ListofmembersComponent } from './listofmembers/listofmembers.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangepswdComponent } from './changepswd/changepswd.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { NormalheaderComponent } from './normalheader/normalheader.component';
import { AddsubcatComponent } from './addsubcat/addsubcat.component';
import { ManageproductComponent } from './manageproduct/manageproduct.component';
import { UpdatesubcatComponent } from './updatesubcat/updatesubcat.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowprodsComponent } from './showprods/showprods.component';
import { ShowproddetailsComponent } from './showproddetails/showproddetails.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ListofordersComponent } from './listoforders/listoforders.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetpassComponent } from './resetpass/resetpass.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ListofmembersComponent,
    SearchuserComponent,
    HomeComponent,
    LogoutComponent,
    ChangepswdComponent,
    AdminheaderComponent,
    AdminpanelComponent,
    AddadminComponent,
    ManagecategoryComponent,
    NormalheaderComponent,
    AddsubcatComponent,
    ManageproductComponent,
    UpdatesubcatComponent,
    UpdateproductComponent,
    ShowcatComponent,
    ShowsubcatComponent,
    ShowprodsComponent,
    ShowproddetailsComponent,
    ShowcartComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    OrderhistoryComponent,
    OrderdetailsComponent,
    ListofordersComponent,
    UpdatestatusComponent,
    SearchresultsComponent,
    ContactusComponent,
    ActivateComponent,
    ResetpasswordComponent,
    ResetpassComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
