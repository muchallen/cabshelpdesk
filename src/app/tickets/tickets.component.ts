import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/models/Ticket';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  allTickets:Ticket[]=[];
  ticketNumber:number=0;
  loading:boolean=true;
  escalations:Ticket[]=[];
  escalationNumber:number=0;
  resolved:Ticket[]=[];
  unresolved:Ticket[]=[];

  constructor(private services:ServicesService) { }

  ngOnInit(): void {
    this.changeNavLink();
    this.onGetAllTickets();
  }

  onGetAllTickets() {
    this.services.getAllTickets().subscribe(res=>{
      this.allTickets=res
 
     this.escalations= this.allTickets.filter(ticket=>ticket.escalationLevel.trim !="NORMAL".trim)

      this.resolved= this.allTickets.filter(ticket=>ticket.ticketStatus ==="CLOSED")
      this.unresolved=this.allTickets.filter(ticket=>ticket.ticketStatus !=="CLOSED")
      this.loading=false

      console.log(this.resolved)
   
    },error=>console.log(console.log(error)));
    
  }

  changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#tickets')?.classList.add('active');
  }

}
