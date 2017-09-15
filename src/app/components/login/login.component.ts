import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _service: DataService) { }
  email: string;
  password: string;
  ngOnInit() {
  }

  login() {
    this._service.login(this.email, this.password)
  }
}
