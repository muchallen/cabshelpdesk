import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  resolved!: Ticket[];

  constructor(private service:ServicesService) { }
  user!:User
  allTickets!:Ticket[] 
  allTicketsNumber=0
  resolvedNumber=0
  pendingNumber=0
  assignedTickets:boolean=true

  
  ngOnInit(): void {
    this.changeNavLink();
    this.getUser()
    this.onGetAllTickets()
  }

  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#profile')?.classList.add('active');
  }

  onGetAllTickets() {
    this.service.getAllTicketsAssigned(this.user.omUsername).subscribe(
      (res) => {
        this.allTickets = res;
        this.resolved = this.allTickets.filter(
          (ticket) => ticket.ticketStatus == 'RESOLVED'
        );
        this.allTicketsNumber=this.allTickets.length;
        this.resolvedNumber=this.resolved.length;
        this.pendingNumber = this.allTicketsNumber-this.resolvedNumber
      },
      (error) => console.log(console.log(error))
    );
  }

  getUser(){
   const data = localStorage.getItem('user')
   this.user=JSON.parse(data||'{}')
  }
  onSignOut(){
    this.service.signOut();
    location.reload();
  }

  toggleTickets(value:boolean){
     this.assignedTickets=value
     switch(this.assignedTickets){
       case true :
        this.service.getAllTicketsAssigned(this.user.omUsername).subscribe(
          (res) => {
            this.allTickets = res;
            this.resolved = this.allTickets.filter(
              (ticket) => ticket.ticketStatus == 'RESOLVED'
            );
            this.allTicketsNumber=this.allTickets.length;
            this.resolvedNumber=this.resolved.length;
            this.pendingNumber = this.allTicketsNumber-this.resolvedNumber
          },
          (error) => console.log(console.log(error))
        );
          break;
        
        case false: 
        this.service.getAllTickets().subscribe(
          (res) => {
            this.allTickets = res;
            this.resolved = this.allTickets.filter(
              (ticket) => ticket.ticketStatus == 'RESOLVED'
            );
            this.allTicketsNumber=this.allTickets.length;
            this.resolvedNumber=this.resolved.length;
            this.pendingNumber = this.allTicketsNumber-this.resolvedNumber
          },
          (error) => console.log(console.log(error))
        );
        break;
            
        
       
     }
   }
}

