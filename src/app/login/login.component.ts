import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { UtilService } from '../service/util-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UtilService]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  validationError:boolean=false;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  
  constructor(
    private formBuilder:FormBuilder,
    private utilService:UtilService,
    private authenticationService:AuthenticationService,
    private router:Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    else{
      let newUser={
        email:this.loginForm.value["email"],
        password:this.loginForm.value["password"]
      };
      this.auth(newUser);
    }
  }

  auth(newUser: {
    email:string;
    password:string;
  }) {
      this.utilService.authenticate(newUser).subscribe(
      (resp) => {
          if(resp.status == 200){
            console.log("200");
            sessionStorage.setItem('loggedinuser',newUser.email);
            this.router.navigate(['itunes'])
          }
          else{
            this.validationError=true;
          }
      },
      (err) => console.error("Error Occured  " + err),
      );
  }
  
}
