import { ApplicationsComponent } from './applications/applications.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
  { path: 'applications', component: ApplicationsComponent },
  { path: 'productForm', component: ProductFormComponent },
  { path: '', redirectTo: '/applications', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
