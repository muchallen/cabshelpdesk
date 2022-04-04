import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private services:ServicesService) { }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    console.log(data.value)
    this.services.signInUser(data.value).subscribe(res=>console.log(res),err=>console.log(err),()=>alert("complete"))
  }

}
