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
      this.allTickets=res.sort(function(a,b){
        return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
      });
       this.escalations= this.allTickets.filter(ticket=>ticket.escalationLevel !="NORMAL" && ticket.ticketStatus!="RESOLVED")
       this.resolved= this.allTickets.filter(ticket=>ticket.ticketStatus =="RESOLVED")
       this.unresolved=this.allTickets.filter(ticket=>ticket.ticketStatus !="RESOLVED")
      this.loading=false
      console.log(this.resolved+ "resolved")
      console.log(this.unresolved+ "unresolved")
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

  toggleTickets(value:boolean){

    this.assignedTickets=value
    switch(this.assignedTickets){
      case true :
           this.services.getAllTicketsAssigned(this.user.omUsername).subscribe(
           (res) => {
            this.escalations= res.sort(function(a,b){
              return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
            }).filter(ticket=>ticket.escalationLevel !="NORMAL" && ticket.ticketStatus!="RESOLVED")
            this.resolved= res.sort(function(a,b){
              return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
            }).filter(ticket=>ticket.ticketStatus =="RESOLVED")
            this.unresolved=res.sort(function(a,b){
              return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
            }).filter(ticket=>ticket.ticketStatus !="RESOLVED")
           this.loading=false
         },  (error) => this.router.navigate(['/error']));;
         break;
         case false :
          
          this.services.getAllTickets().subscribe(
          (res) => {
           this.escalations= res.sort(function(a,b){
            return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
          }).filter(ticket=>ticket.escalationLevel !="NORMAL" && ticket.ticketStatus!="RESOLVED")
           this.resolved= res.sort(function(a,b){
            return new Date(a.dateCreated).getDay () - new Date(b.dateCreated).getDay ();
          }).filter(ticket=>ticket.ticketStatus =="RESOLVED")
           this.unresolved=res.sort(function(a,b){
            return new Date(a.dateCreated).getDay() - new Date(b.dateCreated).getDay();
          }).filter(ticket=>ticket.ticketStatus !="RESOLVED")
           console.log(res)
          this.loading=false
        },  (error) => this.router.navigate(['/error']));
        break;
           
       
      
    }
  }



}
