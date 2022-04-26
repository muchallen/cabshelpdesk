import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading:boolean=false;
  errorText=false;
  constructor(private services: ServicesService, private router:Router) {}

  ngOnInit(): void {}

  onSubmit(data: NgForm) {
    this.loading=true
   
   
    this.services.signInUser(data.value).subscribe(
      (res) => {
        document.cookie="auth"
        sessionStorage.setItem('user',JSON.stringify(res))
        this.router.navigate(['']);
      },
      (err) =>{
          this.errorText=true
          this.loading=false
      } ,
      () => {}
    );
  }
}
