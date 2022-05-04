import { Component, OnInit, Input } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allTickets: Ticket[] = [];
  resolved: Ticket[] = [];
  unresolved: Ticket[] = [];
  loading = true;
  @Input() period: String = '';
  criticalEscalationNumber = 0;
  normalEscalationNumber = 0;
  urgentEscalationNumber = 0;
  importantEscalationNumber = 0;
  user!:User;
  tableData:Ticket[]=[]
  assignedTickets:boolean=true

  openStatusNumber = 0;
  inprogressNumber = 0;
  onholdStatusNumber = 0;
  resolvedStatusNumber = 0;
  declinedStatusNumber = 0;
  awaitingStatusNumber = 0;

  monthsResolved!: [Ticket[]] 
  monthsPending: any[] = [];

  constructor(private services: ServicesService, private router:Router) {}

  ngOnInit(): void {
    this.changeNavLink();
    this.getUser();
    this.onGetAllTickets();
    // this.chartDatasets = this.chartDatasetsMonthly;
   
  }

  onGetAllTickets() {
    this.services.getAllTicketsAssigned(this.user.omUsername).subscribe(
      (res) => {
        this.allTickets = res;
        this.resolved = this.allTickets.filter(
          (ticket) => ticket.ticketStatus != 'RESOLVED'
        );
       
        this.getEscalationsNumbers();
        this.getStatusNumbers();
        this.getMonthlyResolvedStatistics();
        this.loading = false;
      },
      (error) => this.router.navigate(['/error'])
    );
  }
  chartType = 'line';
  chartDatasets: any;
  chartDatasetsMonthly: any = [];
  chartLabels: String[] = [];
  chartLabelsMonthly = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  chartLabelsWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: '#82d616',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: '#ea0606',
      borderWidth: 2,
    },
  ];

  chartOptions: any = {
    responsive: true,
  };

  chartClicked(event: any) {
   
  }

  chartHovered(event: any) {
    
  }

  changeNavLink = () => {
    document
      .querySelectorAll('.active')
      .forEach((item) => item.classList.remove('active'));
    document.querySelector('#dashboard')?.classList.add('active');
  };

 

updateTableData(option:number,value:String){
  switch(option){
    case 1:
      this.tableData = this.allTickets?.filter(
        (ticket) => ticket.escalationLevel.trim() == value.trim()
      );
      break;
    case 2:
    this.tableData = this.allTickets?.filter(
          (ticket) => ticket.ticketStatus.trim() == value.trim()
        );
    break;
  }

}


  getEscalationsNumbers() {
    this.criticalEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'CRITICAL' && ticket.ticketStatus!='RESOLVED'
    ).length;
    this.normalEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'NORMAL' && ticket.ticketStatus!='RESOLVED'
    ).length;
    this.urgentEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'URGENT' && ticket.ticketStatus!='RESOLVED'
    ).length;
    this.importantEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'IMPORTANT' && ticket.ticketStatus!='RESOLVED'
    ).length;
  }

  getStatusNumbers() {
    this.openStatusNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'OPEN'
    ).length;
    this.inprogressNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'IN PROGRESS'
    ).length;
    this.onholdStatusNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'ON HOLD'
    ).length;
    this.resolvedStatusNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'RESOLVED'
    ).length;
    this.declinedStatusNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'DECLINED'
    ).length;
    this.awaitingStatusNumber = this.allTickets?.filter(
      (ticket) => ticket.ticketStatus == 'AWAITING INVESTIGATION'
    ).length;
  }

  togglePeriod(data: any) {
    if (data.value == 'Monthly') {
      this.getMonthlyResolvedStatistics();
    }

    if (data.value == 'Daily') {
      this.getWeeklyResovedStatics();
    }
  }

  getWeeklyResovedStatics(){
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first))
    var lastday = new Date(curr.setDate(last))


    let sunday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==0 ),
    monday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==1  && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday ),
    tuesday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==2 && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday),
    wednesday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==3  && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday),
    thursday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==4  && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday),
    friday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==5  && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday),
    saturday:Ticket[]=this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getDay()==6  && new Date(ticket.dateCreated)>=firstday && new Date(ticket.dateCreated)<=lastday)

        
    this.chartDatasets= [
      {
        data: [
          sunday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          monday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          tuesday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          wednesday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          thursday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          friday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          saturday.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
        ],
        label: 'Resolved',
      },
      { data: [
        sunday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        monday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        tuesday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        wednesday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        thursday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        friday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
        saturday.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
      ], label: 'Pending' },
    ];

    this.chartLabels = this.chartLabelsWeek;

  }
    


  

  

  getMonthlyResolvedStatistics() {
    let jan: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==0),
      feb: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==1),
      mar: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==2),
      apr: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==3),
      may: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==4),
      june: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==5),
      july: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==6),
      aug: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==7),
      sep: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==8),
      oct: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==9),
      nov: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==10),
      dec: Ticket[] = this.allTickets.filter(ticket=>new Date(ticket.dateCreated).getMonth()==11);
 

    

    
    this.chartDatasets= [
      {
        data: [
          jan.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          feb.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          mar.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          apr.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          may.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          june.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          july.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          aug.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          sep.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          oct.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          nov.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          dec.filter(ticket=>ticket.ticketStatus=='RESOLVED').length
        ],
        label: 'Resolved',
      },
      { data: [
          jan.filter(ticket=>ticket.ticketStatus=='RESOLVED').length,
          feb.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          mar.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          apr.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          may.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          june.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          july.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          aug.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          sep.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          oct.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          nov.filter(ticket=>ticket.ticketStatus!='RESOLVED').length,
          dec.filter(ticket=>ticket.ticketStatus!='RESOLVED').length
      ], label: 'Pending' },
    ];

    this.chartLabels = this.chartLabelsMonthly;

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
              this.allTickets = res;
              this.resolved = this.allTickets.filter(
                (ticket) => ticket.ticketStatus != 'RESOLVED'
              );
            
              this.getEscalationsNumbers();
              this.getStatusNumbers();
              this.getMonthlyResolvedStatistics();
              this.loading = false;
            },
            (error) => this.router.navigate(['/error'])
          );
          break;
        
        case false: 
        this.services.getAllTickets().subscribe(
          (res) => {
            this.allTickets = res;
            this.resolved = this.allTickets.filter(
              (ticket) => ticket.ticketStatus != 'RESOLVED'
            );
  
            this.getEscalationsNumbers();
            this.getStatusNumbers();
            this.getMonthlyResolvedStatistics();
            this.loading = false;
          },
          (error) => this.router.navigate(['/error'])
        );
        break;
            
        
       
     }
   }
}
