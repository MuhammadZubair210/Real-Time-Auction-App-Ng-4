import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MaterialModule, MdNativeDateModule, MdDatepickerModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { DataService } from "./services/data.service";
import { FormBuilder } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducer/store';
import { HomeComponent } from './home/home.component';
import { AuctionComponent } from './components/auction/auction.component';
import { BidderComponent } from './components/bidder/bidder.component';
import { ProductService } from "./services/product.service";


export const config = {
  apiKey: "AIzaSyAxS05XfwV4W1lrePNHVRozgIx4FBuwqzY",
  authDomain: "online-auction-ffe82.firebaseapp.com",
  databaseURL: "https://online-auction-ffe82.firebaseio.com",
  projectId: "online-auction-ffe82",
  storageBucket: "",
  messagingSenderId: "415146868590"
};

const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "auction", component: AuctionComponent },
  { path: "bidder", component: BidderComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AuctionComponent,
    BidderComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(config),
    MaterialModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore({ appStore: appReducer })
  ],
  providers: [DataService, FormBuilder,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
