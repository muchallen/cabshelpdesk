import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errorcomponent',
  templateUrl: './errorcomponent.component.html',
  styleUrls: ['./errorcomponent.component.css']
})
export class ErrorcomponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  retry(){
    location.assign('/')
  }

}
