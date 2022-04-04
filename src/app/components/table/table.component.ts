import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Ticket } from 'src/app/shared/models/Ticket';
import { ServicesService } from 'src/app/shared/services.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination:any
  @ViewChild(MdbTableDirective, { static: true }) mdbTable:any
  elements: any = [];
  previous: any = [];
  headElements = ['Ticket Type', 'Client Name','Status','Description'];
  searchText: string = '';
  selectedTicket:Ticket={
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
  }

  @Input() data: Ticket[]=[];



  constructor(private cdRef: ChangeDetectorRef, private services:ServicesService) { 
   
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.mdbTable.setDataSource(this.data);
    this.data = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.data = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.data = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['client Name', 'ticket type', 'description', 'status']);
      this.mdbTable.setDataSource(prev);
    }
  }

  openModal(value:Ticket){ 
      this.selectedTicket = value;
      this.services.selectedTicket = value
     
      
  }

}