import { Component, OnInit ,OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
  assignedTickets:boolean=true

  number=true;


  constructor(private services:ServicesService, private router:Router) { }
  
 

  ngOnInit(): void {
    
    this.changeNavLink();
    this.getUser();
    this.onGetAllTickets();
   
  }


  onGetAllTickets() {
    
      this.services.getAllTicketsAssigned(this.user.omUsername).subscribe(res=>{
      this.filterequals(res)
      this.loading=false  
    },
    (error) => this.router.navigate(['/error']));
    
  }

  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#tickets')?.classList.add('active');
  }



  getUser(){
    const data = sessionStorage.getItem('user')
    this.user=JSON.parse(data||'{}')
   }
   onSignOut(){
    this.services.signOut();
    location.reload();
  }


   filterequals( ticketsArray:Ticket[]) {
    this.escalations = ticketsArray.filter(ticket=>ticket.escalationLevel !="NORMAL" && ticket.ticketStatus!="RESOLVED").sort(function(a,b){
      return Date.parse(b.dateCreated.toString()) - Date.parse(a.dateCreated.toString());
    });
    this.resolved = ticketsArray.filter(ticket=>ticket.ticketStatus =="RESOLVED").sort(function(a,b){
      return Date.parse(b.dateCreated.toString()) - Date.parse(a.dateCreated.toString());
    });
    this.unresolved= ticketsArray.filter(ticket=>ticket.ticketStatus !="RESOLVED").sort(function(a,b){
      return Date.parse(b.dateCreated.toString()) - Date.parse(a.dateCreated.toString());;
    });
  }

  toggleTickets(value:boolean){

    this.assignedTickets=value
    switch(this.assignedTickets){
      case true :
           this.services.getAllTicketsAssigned(this.user.omUsername).subscribe(
           (res) => {
            this.filterequals(res)
            this.loading=false
         },  (error) => this.router.navigate(['/error']));;
         break;
         case false :
          
          this.services.getAllTickets().subscribe(
          (res) => {
            this.filterequals(res)
          this.loading=false
        },  (error) => this.router.navigate(['/error']));
        break;
           
       
      
    }
  }



}
