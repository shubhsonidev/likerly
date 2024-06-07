import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { QrCodeModule } from 'ng-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { RedirectComponent } from './redirect/redirect.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TrackComponent } from './track/track.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [AppComponent, MainComponent, RedirectComponent, NotFoundComponent, TrackComponent, SearchComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    QrCodeModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
