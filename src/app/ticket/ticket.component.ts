import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from '../shared/models/Ticket';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket: Ticket={
    dateCreated:new Date,
    lastUpdated:'',
    closedAt:'',
    ticketType:'',
    assignee:'',
    escalationLevel:'',
    ticketStatus:'',
    estimatedResolutionTime: new Date,
    actualResolutionTime:    0,
    dailyReportSent: false,
    name:'',
    phone:'',
    email:'',
    businessUnit:'',
    description:''
  } ;
  constructor(private services:ServicesService) { 
    
  }

  ngOnInit(): void {
    this.changeNavLink();
    this.ticket= this.services.selectedTicket
  }
  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#tickets')?.classList.add('active');
  }

  handleEscalate(val:NgForm){
   const escalation = {...val.value, id:12933992}
   console.log(escalation)
   this.services.escalateTicket(escalation).subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
   
  }

  handleReassign(val:NgForm){
    console.log(val.value)
    this.services.reassignTicket(val.value).subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

  handleDelete(){
    this.services.deleteTicket("").subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

  handleResolve(){
    this.services.reassignTicket("").subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

}
