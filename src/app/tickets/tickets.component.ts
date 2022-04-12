import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  allTickets:Ticket[]|[]=[];
  ticketNumber:number=0;
  loading:boolean=true;
  escalations:Ticket[]=[];
  escalationNumber:number=0;
  resolved:Ticket[]=[];
  unresolved:Ticket[]=[];
  user!:User


  constructor(private services:ServicesService) { }

  ngOnInit(): void {
    
    this.changeNavLink();
    this.getUser();
    this.onGetAllTickets();
  }

  onGetAllTickets() {
    
    this.services.getAllTicketsAssigned(this.user.omUsername).subscribe(res=>{
      this.allTickets=res
      this.escalations= this.allTickets.filter(ticket=>ticket.escalationLevel !="NORMAL" && ticket.ticketStatus!="RESOLVED")
       this.resolved= this.allTickets.filter(ticket=>ticket.ticketStatus =="RESOLVED")
       this.unresolved=this.allTickets.filter(ticket=>ticket.ticketStatus !="RESOLVED")
      this.loading=false
      console.log(this.resolved+ "resolved")
      console.log(this.unresolved+ "unresolved")
    },error=>console.log(console.log(error)));
    
  }

  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#tickets')?.classList.add('active');
  }

  getUser(){
    const data = localStorage.getItem('user')
    this.user=JSON.parse(data||'{}')
   }
   onSignOut(){
    this.services.signOut();
    location.reload();
  }

}
