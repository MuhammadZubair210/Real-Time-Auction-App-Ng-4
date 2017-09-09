import { Component } from '@angular/core';
import { DataService } from "./services/data.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
user;
  constructor(public _service:DataService ,public afAuth:AngularFireAuth){
    console.log(this._service.varauth)
    this.user = this.afAuth.authState;
  }
  logout(){
    this._service.logout();
  }
}
