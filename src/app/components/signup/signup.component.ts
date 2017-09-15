import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from "@angular/router";
// import { FormControlName } from "@angular/forms";
import UserModel, { Categories } from "../../models/product";
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
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'type': ['', Validators.required]
    })
  }

  register(form: UserModel) {
    this._service.register(form);
    console.log(form)
  }

}

