import { Component, OnInit , Input} from '@angular/core';
import { Ticket } from '../shared/models/Ticket';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allTickets:Ticket[]=[];
  loading=true;
  @Input() period:String=""
  criticalEscalationNumber=0
  normalEscalationNumber=0
  urgentEscalationNumber=0
  importantEscalationNumber=0

  openStatusNumber = 0;
  inprogressNumber=0;
  onholdStatusNumber=0;
  resolvedStatusNumber=0;
  declinedStatusNumber=0;
  awaitingStatusNumber=0;






  constructor(private services:ServicesService) {
   }

  ngOnInit(): void {
    this.changeNavLink();
    this.onGetAllTickets()
    this.chartDatasets = this.chartDatasetsMonthly
    this.chartLabels= this.chartLabelsWeek
    
    
  }
  chartType = 'line';
  chartDatasets:any
  chartDatasetsMonthly = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Resolved' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Escalated' }
  ];
  chartLabels:String[]=[]
  chartLabelsMonthly = ['January', 'February', 'March', 'April', 'May', 'June', 'July' ,'Aug', 'Sep','Oct', 'Nov', 'Dec'];
  chartLabelsWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }


   changeNavLink = () => {
    document.querySelectorAll(".active").forEach(item=>item.classList.remove("active"));
    document.querySelector('#dashboard')?.classList.add('active');
  }

   onGetAllTickets() {
    this.services.getAllTickets().subscribe(res=>{
      this.allTickets=res
      console.log(res)
      this.getEscalationsNumbers()
      this.getStatusNumbers()
      this.loading=false
    },error=>console.log(console.log(error)));
    
  }

   getEscalationsNumbers(){
    this.criticalEscalationNumber= this.allTickets.filter(ticket=>ticket.escalationLevel =="CRITICAL").length
    this.normalEscalationNumber= this.allTickets.filter(ticket=>ticket.escalationLevel =="NORMAL").length
    this.urgentEscalationNumber= this.allTickets.filter(ticket=>ticket.escalationLevel=="URGENT").length
    this.importantEscalationNumber= this.allTickets.filter(ticket=>ticket.escalationLevel=="IMPORTANT").length
    
   
  }

  getStatusNumbers(){
    this.openStatusNumber= this.allTickets.filter(ticket=>ticket.ticketStatus =="OPEN").length
    this.inprogressNumber= this.allTickets.filter(ticket=>ticket.ticketStatus =="IN PROGRESS").length
    this.onholdStatusNumber= this.allTickets.filter(ticket=>ticket.ticketStatus=="ON HOLD").length
    this.resolvedStatusNumber= this.allTickets.filter(ticket=>ticket.ticketStatus=="RESOLVED").length
    this.declinedStatusNumber= this.allTickets.filter(ticket=>ticket.ticketStatus=="DECLINED").length
    this.awaitingStatusNumber= this.allTickets.filter(ticket=>ticket.ticketStatus =="AWAITING INVESTIGATION").length
  }


togglePeriod(data:any){
 if( data.value=="Monthly"){
  this.chartDatasets = this.chartDatasetsMonthly
  this.chartLabels=this.chartLabelsMonthly}

  if( data.value=="Weekly"){
  this.chartDatasets = this.chartDatasetsMonthly
  this.chartLabels=this.chartLabelsWeek}

 // alert( (Date("2022-04-01T09:03:22.124+00:00")))
  

}

  

}

