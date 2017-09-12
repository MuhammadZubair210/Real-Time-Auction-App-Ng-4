import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, Route } from '@angular/router';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { ActionType } from '../reducer/store'
import UserModel from '../reducer/action'
@Injectable()
export class DataService {
  authstate;
  isSignIn: Observable<boolean>;
  user: Observable<firebase.User>;
  useremail;
  varauth;
  constructor(public af: AngularFireAuth, public db: AngularFireDatabase, public router: Router, private store: Store<UserModel>) {
    this.varauth = this.af.authState;
    this.af.authState.subscribe((auth) => {
      if (auth) {
        this.authstate = auth.uid;
        this.useremail = auth.email;
        console.log(auth.email);
        console.log(this.authstate);
        console.log("Auth Changes");
        if (auth.email) {
          this.router.navigate(['/home']);
        }
      }
      else {
        console.log("user not logged in")
        this.router.navigate(["/login"])
      }
    })
  }


  email;
  password;
  type;
  uuid;

  userprofile: FirebaseListObservable<any[]>;

  showuser() {
    this.uuid = this.af.auth.currentUser.uid;

    this.userprofile = this.db.list('/users/' + this.uuid, { preserveSnapshot: true });
    this.userprofile
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.val().type == 'user') {
            this.router.navigate(['/home']);
            this.store.dispatch({ type: ActionType.User, payload: this.uuid });
          }
          else {
            alert("show correct email or password");
            this.router.navigate(['/login']);
          }
          console.log(snapshot.key);
          console.log(snapshot.val().type);
        });
      })
  }
    
  register(name: string, email: string, password: string, type: string) {
    console.log("successfull");
    console.log(name, email, password, type);
    this.af.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!');
        this.uuid = this.af.auth.currentUser.uid;
        let formdata = { name, email, password, type };
        this.db.list("/users/" + this.uuid).push(formdata);
        this.store.dispatch({ type: ActionType.User, payload: formdata });
        this.router.navigate(["/login"])
      })
      .catch(err => {
        console.log('Something went wrong:');

      })
  }

  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log("success");
        this.showuser();
      })
      .catch(err => {
        console.log("something wrong", err);
        this.router.navigate(["login"]);
      })
  }
  logout() {
    this.af.auth.signOut();
    this.store.dispatch({ type: ActionType.User, payload: null });
  }
  names;
  name;
  fetchname(uid) {
    this.userprofile = this.db.list('/users/' + uid, { preserveSnapshot: true });
    this.userprofile
      .subscribe(snapshots => {
        this.name;
        snapshots.forEach(snapshot => {
          this.name = snapshot.val().name;
          console.log(this.name)

        })
      })
    this.names = this.name
  }

  // applybids(uid) {
  //   this.userprofile = this.db.list('/auction/' + uid, { preserveSnapshot: true });
  //   this.userprofile
  //     .subscribe(snapshots => {
  //       this.name;
  //       snapshots.forEach(snapshot => {
  //         this.name = snapshot.val().name;
  //         console.log(this.name)
  //       })
  //     })
  // }
}