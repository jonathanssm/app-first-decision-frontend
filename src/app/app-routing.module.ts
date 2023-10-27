import {Routes} from '@angular/router';
import {SignUpComponent} from "./view/user/sign-up/sign-up.component";
import {HomeComponent} from "./view/home/home.component";
import {SignInComponent} from "./view/user/sign-in/sign-in.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent}
];
