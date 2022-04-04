import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private services:ServicesService) { }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    console.log(data.value)

    this.services.createUser(data.value).subscribe(res=>console.log(res),err=>console.log(err),()=>alert("complete"))
  }


}
