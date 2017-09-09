import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(public db: AngularFireDatabase) { }



  addProduct(value, uid) {
    this.db.object("/product/" + uid).set(value)
  }


}
