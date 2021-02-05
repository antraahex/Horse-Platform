import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule} from "@angular/forms";
import { ApplicationsComponent, MenuItem } from './applications/applications.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { DropdownModule} from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule} from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CKEditorModule,
    DropdownModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    SplitButtonModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
