import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormmanagerComponent } from './formmanager/formmanager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MfWizardComponent } from './mf-wizard/mf-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormmanagerComponent,
    MfWizardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { 
  "styles": [
    "node_modules/bootstrap/scss/bootstrap.scss",
    "node_modules/bootstrap-icons/font/bootstrap-icons.css",
    "src/styles.scss"
  ]
  "scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  ]
}

