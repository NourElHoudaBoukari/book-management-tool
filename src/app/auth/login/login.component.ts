import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit(): void {

    this.loginForm=this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){

    this.authService.SignIn(this.login.value, this.password.value)
    
  }

  get login(){
    return this.loginForm.get('login');
  }

  get password(){
    return this.loginForm.get('password');
  }


}
