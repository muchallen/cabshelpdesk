import { Component, OnInit, Input } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Ticket } from '../shared/models/Ticket';
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

  openStatusNumber = 0;
  inprogressNumber = 0;
  onholdStatusNumber = 0;
  resolvedStatusNumber = 0;
  declinedStatusNumber = 0;
  awaitingStatusNumber = 0;

  months: any[] = [];

  constructor(private services: ServicesService) {}

  ngOnInit(): void {
    this.changeNavLink();
    this.onGetAllTickets();
    // this.chartDatasets = this.chartDatasetsMonthly;
   
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
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }

  changeNavLink = () => {
    document
      .querySelectorAll('.active')
      .forEach((item) => item.classList.remove('active'));
    document.querySelector('#dashboard')?.classList.add('active');
  };

  onGetAllTickets() {
    this.services.getAllTickets().subscribe(
      (res) => {
        this.allTickets = res;
        this.resolved = this.allTickets.filter(
          (ticket) => ticket.ticketStatus != 'RESOLVED'
        );
        console.log(res);
        this.getEscalationsNumbers();
        this.getStatusNumbers();
        this.getMonthlyResolvedStatistics();
        this.loading = false;
      },
      (error) => console.log(console.log(error))
    );
  }

  getEscalationsNumbers() {
    this.criticalEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'CRITICAL'
    ).length;
    this.normalEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'NORMAL'
    ).length;
    this.urgentEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'URGENT'
    ).length;
    this.importantEscalationNumber = this.allTickets?.filter(
      (ticket) => ticket.escalationLevel == 'IMPORTANT'
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
      this.getMonthlyResolvedStatistics()
    }

    if (data.value == 'Weekly') {
      this.chartDatasets = this.chartDatasetsMonthly;
      this.chartLabels = this.chartLabelsWeek;
    }
  }

  getMonthlyResolvedStatistics() {
    let jan: any = [],
      feb: any = [],
      mar: any = [],
      apr: any = [],
      may: any = [],
      june: any = [],
      july: any = [],
      aug: any = [],
      sep: any = [],
      oct: any = [],
      nov: any = [],
      dec: any = [];
    for (let i = 0; i < 12; i++) {
      this.resolved?.forEach((ticket) => {
        let date = new Date(ticket.dateCreated).getMonth();
        if (date == i) {
          switch (i) {
            case 0:
              jan.push(ticket);
              break;
            case 1:
              feb.push(ticket);
              break;
            case 2:
              mar.push(ticket);
              break;
            case 3:
              apr.push(ticket);
              break;
            case 4:
              may.push(ticket);
              break;
            case 5:
              june.push(ticket);
              break;
            case 6:
              july.push(ticket);
              break;
            case 7:
              aug.push(ticket);
              break;
            case 8:
              sep.push(ticket);
              break;
            case 9:
              oct.push(ticket);
              break;
            case 10:
              nov.push(ticket);
              break;
            case 11:
              dec.push(ticket);
              break;
          }
        }
      });
    }

    this.months = [
      jan,
      feb,
      mar,
      apr,
      may,
      june,
      july,
      aug,
      sep,
      oct,
      nov,
      dec,
    ];

    console.log(this.months)
    this.chartDatasets= [
      {
        data: [
          this.months[0].length,
          this.months[1].length,
          this.months[2].length,
          this.months[3].length,
          this.months[4].length,
          this.months[5].length,
        ],
        label: 'Resolved',
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Pending' },
    ];

    this.chartLabels = this.chartLabelsMonthly;

  }
}
