import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.css']
})
export class BidderComponent implements OnInit {
  Category: any;
  items: FirebaseListObservable<any[]>
  constructor(public db: AngularFireDatabase, public af: AngularFireAuth, public _service: DataService) {
    this._service.fetchname(this.af.auth.currentUser.uid)
    this.timecheck(this.key, this.Category)

  }

  ngOnInit() {
  }
  amount;

  key = [];

  func() {
    this.mybid = [];
    this.items = this.db.list('/auction/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.key = [];
        snapshots.forEach(snapshot => {
          snapshot.forEach(data => {
            console.log(data.key)
            console.log(data.val().Description)
            if (data.val().Category == "mobile") {
              this.key.push(data.val())
              console.log(this.key)
            }
          })
        })
      })
  }
  func1key = [];
  funcl() {
    this.mybid = []
    this.items = this.db.list('/auction/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.key = [];
        snapshots.forEach(snapshot => {
          snapshot.forEach(data => {

            console.log(snapshot.val())
            if (data.val().Category == "laptop") {
              this.key.push(data.val())
              console.log(this.key)
            }
          })
        })
      })
  }
  func2key = [];
  func2() {
    this.mybid = [];
    this.items = this.db.list('/auction/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.key = [];
        snapshots.forEach(snapshot => {
          snapshot.forEach(data => {
            console.log(snapshot.val())
            if (data.val().Category == "tablet") {
              this.key.push(data.val())
              console.log(this.key)
            }
          })
        })
      })
  }

  allkeys = [];
  bidprofile = [];
  currentbidIndex = [];
  mybid = [];
  auckey = []
  bids: FirebaseListObservable<any[]>
  varkey;
  addedbids = [];
  auc = [];
  isTrue = true;
  True = false;
  time;
  bid(key, Category) {
    this.key = [];
    this.items = this.db.list('/auction/' + Category, { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.auckey = [];
        this.allkeys = [];
        this.mybid = [];
        this.auc = [];
        this.time;
        snapshots.forEach(snapshot => {
          this.allkeys.push(snapshot.val())
          this.auckey.push(snapshot.key)
          console.log(this.key)
          console.log(snapshot.val().AutionEndTimeStamp)
          this.time = snapshot.val().AutionEndTimeStamp
        })
      })
    this.varkey = this.auckey[key]
    this.mybid.push(this.allkeys[key]);
    this.timecheck(key, Category)
    this.addbids(key, Category)
  }

  largest = 0;
  largestname;
  awardedname: String;
  aucamount = [];
  addbids(key, Category) {
    console.log(this._service.name)
    // this.items = this.db.list('/auction/' + Category + '/' + this.varkey + '/bids/', { preserveSnapshot: true });
    this.items = this.db.list('/bids/' + this.varkey, { preserveSnapshot: true });

    console.log(this.varkey)
    this.items
      .subscribe(snapshots => {
        this.auc = [];
        this.aucamount = []
        this.largest = 0;
        snapshots.forEach(bid => {
          console.log(bid.val())
          if (this.varkey == bid.val().key) {
            this.auc.push(bid.val())
            this.aucamount.push(bid.val().amount)
            console.log(this.auc)
          }
          console.log(bid.key)
          for (var i = 0; i <= this.aucamount.length; i++) {
            if (this.aucamount[i] > this.largest) {
              this.largestname = bid.val().name
              this.largest = this.aucamount[i];
            }
          }
        })
      })
  }
  pushkey = [];
  pushval = [];
  verify: FirebaseListObservable<any[]>;
  timecheck(key, Category) {
    this.verify = this.db.list('/auction/' + Category, { preserveSnapshot: true });
    console.log(this.auckey[key])
    this.verify
      .subscribe(snapshots => {
        this.isTrue = true;
        this.True = false;
        this.pushkey = [];
        this.pushval = [];
        new Date().getTime();
        snapshots.forEach(bid => {
          this.pushkey.push(bid.key)
          this.pushval.push(bid.val())
        })
        if (this.echeck(key, Category)) {

          console.log("working")
          this.isTrue = false;
          this.True = true;
        }
        else {
          console.log("not working")
          this.isTrue = true;
          this.True = false;
        }
      })
  }

  echeck(key, category) {
    for (var i = 0; i < this.pushkey.length; i++) {
      if (this.pushkey[key] == this.pushkey[i]) {
        console.log(key, category)
        console.log(this.pushval[key].AutionEndTimeStamp)
        if ((new Date().getTime()) > this.pushval[key].AutionEndTimeStamp) {
          console.log("not submitted")
          return true;
        }
      }
    }
  }
  lowamount = false
  bidnow = false;
  enterbid() {
    this.alert = false;
    this.lowamount = false;
    this.notsubmit = false;
    this.sameamount = false;
  }
  japply: FirebaseListObservable<any[]>;
  alert = false;
  notsubmit = false;
  sameamount = false;
  submitamount(i) {
    console.log(this.varkey)
    console.log(this.mybid)
    console.log(this.largest)
    if (this.mybid[i].AutionEndTimeStamp > (new Date().getTime())) {
      if (this.amount >= this.mybid[i].BidStartingAmount) {
        if (this.amount > this.largest) {
          console.log(this.amount)
          console.log(this.largest)
          let data = { key: this.varkey, amount: this.amount, name: this._service.name }
          this.japply = this.db.list('/bids/' + this.varkey, { preserveSnapshot: true })
          this.alert = true
          this.sameamount = false;
          this.lowamount = false;
          this.notsubmit = false;
          this.japply.push(data)
        }
        else {
          this.sameamount = true;
        }
      }
      else {
        this.alert = false
        this.lowamount = true
      }
    }
    else {
      this.alert = false;
      this.notsubmit = true;
      console.log("not Working")
    }

  }
}
