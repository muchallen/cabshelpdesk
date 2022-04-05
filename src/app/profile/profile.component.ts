import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  user:User={
    email: "",
    firstname: "",
    lastname: "",
    omUsername: "",
    role: "",
    available: false,
    ticketCount: 0
  }
  
  ngOnInit(): void {
    this.changeNavLink();
    this.getUser()
  }

  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#profile')?.classList.add('active');
  }

  getUser(){
   const data = localStorage.getItem('user')
   this.user=JSON.parse(data||'{}')
  }
}
