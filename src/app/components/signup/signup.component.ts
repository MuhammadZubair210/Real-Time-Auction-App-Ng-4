import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from "@angular/router";
// import { FormControlName } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(public _service: DataService, public router: Router, public fb: FormBuilder) { }
name;
email;
password;
type;

  ngOnInit() {
  }

  register() {
    this._service.register(this.name,this.email,this.password,this.type);
    console.log(this.name,this.email,this.password,this.type)
  }

}

