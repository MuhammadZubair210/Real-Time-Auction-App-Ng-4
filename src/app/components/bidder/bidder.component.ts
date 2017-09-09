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
    this.addbids(key, Category)
    this.timecheck(key, Category)
  }

  japply: FirebaseListObservable<any[]>;

  submitamount(i, category) {
    console.log(this.auckey[i])
    let data = { key: this.varkey, amount: this.amount, name: this._service.name }
    this.japply = this.db.list('/bids/' + this.varkey, { preserveSnapshot: true })
    this.japply.push(data)
  }
  largest = 0;
  largestname;
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
          // console.log(this.varkey)
          console.log(bid.key)

          for (var i = 0; i <= this.aucamount.length; i++) {
            if (this.aucamount[i] > this.largest) {
              this.largestname = bid.val().name
              this.largest = this.aucamount[i];
            }
          }
          console.log(this.largestname)
          console.log(this.largest);


        })
      })

  }
  pushkey = [];
  pushval = [];
  verify: FirebaseListObservable<any[]>;
  timecheck(key, Category) {
    // console.log(this._service.name)
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
          for (var i = 0; i < this.pushkey.length; i++) {
            if (this.pushkey[key] == this.pushkey[i]) {
              console.log(this.pushkey[key])
              console.log(this.pushval[key].AutionEndTimeStamp)
              if ((new Date().getTime()) > this.pushval[key].AutionEndTimeStamp) {
                this.isTrue = false;
                this.True = true;
              }
              else {
                this.isTrue = true;
                this.True = false;
              }
            }
          }
        })
      })

  }
  bidnow = false;
  enterbid() {
    if (this.bidnow == false) {
      this.bidnow = true;
    }
    else {
      this.bidnow = false;
    }
  }

}