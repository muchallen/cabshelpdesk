import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket: Ticket={
    id:'',
    dateCreated:new Date,
    lastUpdated:'',
    closedAt:'',
    ticketType:'',
    assignee:'',
    escalationLevel:'',
    ticketStatus:'',
    estimatedResolutionTime: "",
    actualResolutionTime:    0,
    dailyReportSent: false,
    name:'',
    phone:'',
    email:'',
    businessUnit:'',
    description:''
  } ;
  AllUsers:User[]=[]
  constructor(private services:ServicesService) { 
    
  }

  ngOnInit(): void {
    this.changeNavLink();
    this.ticket= this.services.selectedTicket
    this.getAllUsers();
    
  }
  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#tickets')?.classList.add('active');
  }

  handleEscalate(val:NgForm){
  
   this.services.escalateTicket(val.value).subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
   
  }

  handleReassign(val:NgForm){
    console.log(val.value)
    this.services.reassignTicket(val.value).subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

  handleDelete(){
    this.services.deleteTicket(this.ticket.id).subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

  handleResolve(){
    this.services.reassignTicket("").subscribe(res=>console.log(res),err=>console.log(err),()=>console.log("done escalating"));
  }

  getAllUsers(){
    this.services.getAllUsers().subscribe(res=>this.AllUsers=res,err=>console.log(err),()=>console.log("done getting users"))
  }

  onChange(data:any){
    console.log(data.value)
    let User =[]

      User= this.AllUsers.filter(user=>user.firstname)
  }

}
