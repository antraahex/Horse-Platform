import { ApplicationsComponent } from './applications/applications.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SocialLoginComponent } from './social-login/social-login.component';


const routes: Routes = [
  { path: 'applications', component: ApplicationsComponent },
  { path: 'productForm', component: ProductFormComponent },
  { path: 'socialLogin', component: SocialLoginComponent },
  { path: '', redirectTo: '/socialLogin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
