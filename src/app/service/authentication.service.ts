import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router:Router
    ) { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('loggedinuser');
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('loggedinuser');
    this.router.navigate(['login']);
  }
}
