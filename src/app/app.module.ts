import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { annotationsReducer } from "./store/reducer";
import { HttpClientModule } from "@angular/common/http";
import { ImageService } from "./services/image.service";
import { EffectsModule } from "@ngrx/effects";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ annotations: annotationsReducer }),
    EffectsModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
