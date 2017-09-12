import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from "../../services/data.service";
import { ProductService } from "../../services/product.service";
import UserModel from "../../reducer/action";
import ProductModel, { Categories } from "../../reducer/product";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  constructor(public fb: FormBuilder,
    private userService: DataService,
    private productsService: ProductService,
    private router: Router,
    private store: Store<UserModel>,
    public db: AngularFireDatabase,
    public af: AngularFireAuth,
  ) { }
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = this.fb.group({
      'Title': ['', Validators.required],
      'Description': ['', Validators.required],
      'Category': ['', Validators.required],
      'AutionEndDate': ['', Validators.required],
      'AutionEndTime': ['', Validators.required],
      'BidStartingAmount': ['', Validators.required],
    });

  }
  show = false;
  submitshow = false
  submit(value: ProductModel) {

    let startdate = new Date(value.AutionEndDate + " " + value.AutionEndTime);
    if (startdate.getTime() < new Date().getTime()) {
      this.show = true;
      this.submitshow = false;
    }
    else {
      value.uid = this.af.auth.currentUser.uid;
      value.Title = value.Title;
      value.Description = value.Description;
      value.AutionEndDate = value.AutionEndDate;
      value.AutionEndTimeStamp = startdate.getTime();
      value.MinimumBidAmount = value.BidStartingAmount;
      value.Category = value.Category;
      console.log(value)
      this.db.list("auction/" + value.Category).push(value);
      this.submitshow = true;
      this.show = false;
      // this.router.navigate(['/home'])
    }
  }


}
