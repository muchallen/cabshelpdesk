import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading:boolean=false;
  errorText=false;
  constructor(private services: ServicesService, private router:Router) {}


  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    this.loading=true;
    console.log(data.value)

    this.services.createUser(data.value).subscribe((res) => {
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
