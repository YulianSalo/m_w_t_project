import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AddsubcatComponent } from './addsubcat/addsubcat.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ChangepswdComponent } from './changepswd/changepswd.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { ListofmembersComponent } from './listofmembers/listofmembers.component';
import { ListofordersComponent } from './listoforders/listoforders.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { ManageproductComponent } from './manageproduct/manageproduct.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { ShowcartComponent } from './showcart/showcart.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowproddetailsComponent } from './showproddetails/showproddetails.component';
import { ShowprodsComponent } from './showprods/showprods.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { UpdatesubcatComponent } from './updatesubcat/updatesubcat.component';

const routes: Routes = [

  {
    path:"",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"changepswd",
    component:ChangepswdComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"memlist",
    component:ListofmembersComponent
  },
  {
    path:"searchuser",
    component:SearchuserComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"adminpanel",
    component:AdminpanelComponent,
    canActivate:[AdminGuard]
  },
  {
    path:"addadmin",
    component:AddadminComponent
  },
  {
    path:"managecat",
    component:ManagecategoryComponent
  },
  {
    path:"managescat",
    component:AddsubcatComponent
  },
  {
    path:"manageprod",
    component:ManageproductComponent
  },
  {
    path:"updatesubcat",
    component:UpdatesubcatComponent
  },
  {
    path:"updateprod",
    component:UpdateproductComponent
  },
  {
    path:"showcat",
    component:ShowcatComponent
  },
  {
    path:"showscat",
    component:ShowsubcatComponent
  },
  {
    path:"showprods",
    component:ShowprodsComponent
  },
  {
    path:"showpdetails",
    component:ShowproddetailsComponent
  },
  {
    path:"showcart",
    component:ShowcartComponent
  },
  {
    path:"checkout",
    component:CheckoutComponent
  },
  {
    path:"ordersummary",
    component:OrdersummaryComponent
  },
  {
    path:"ordersummary",
    component:OrdersummaryComponent
  },
  {
    path:"orderhistory",
    component:OrderhistoryComponent
  },
  {
    path:"orderdetails",
    component:OrderdetailsComponent
  },
  {
    path:"allorders",
    component:ListofordersComponent
  },
  {
    path:"updatestatus",
    component:UpdatestatusComponent
  },
  {
    path:"searchresults",
    component:SearchresultsComponent
  },
  {
    path:"contactus",
    component:ContactusComponent
  },
  {
    path:"activate",
    component:ActivateComponent
  },
  {
    path:"resetpassword",
    component:ResetpasswordComponent
  },
  {
    path:"resetpass",
    component:ResetpassComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
