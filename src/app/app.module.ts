import { NewParentComponent } from './components/new-parent/new-parent.component';
import { NewCareComponent } from './components/new-care/new-care.component';
import { CuidadosComponent } from './components/cuidados/cuidados.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    CuidadosComponent,
    NewCareComponent,
    NewParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
