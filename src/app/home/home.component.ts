import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _service:DataService, public af:AngularFireAuth) {
    this._service.fetchname(this.af.auth.currentUser.uid)
    console.log(this._service.name)
  }

  ngOnInit() {
  }

}
