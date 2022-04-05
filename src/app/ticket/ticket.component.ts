import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  AllUsers: User[] = [];
  selectedUser!: User;
  loading=false;

  constructor(private services: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.changeNavLink();
    this.ticket = this.services.selectedTicket;
    this.getAllUsers();
  }
  changeNavLink = () => {
    document
      .querySelectorAll('.active')
      .forEach((item) => item.classList.remove('active'));
    document.querySelector('#tickets')?.classList.add('active');
  };

  handleEscalate(val: NgForm) {
    this.loading=true
    console.log(val.value)
    const data ={ ...val.value, id:this.ticket.id}

    this.services.escalateTicket(data).subscribe(
      (res) => {console.log(res)
        alert("your ticket has been escalated to "+val.value)
    
        this.loading=false
      },
      (err) => {console.log(err)
      alert("An error has occured please try again")
      this.loading=false
      },
      () => console.log('done escalating')
    );
  }

  handleReassign(val: NgForm) {
    this.loading=true
    const data = {
      assignee: this.selectedUser.omUsername,
      id: this.ticket.id,
    };

    this.services.reassignTicket(data).subscribe(
      (res) => {console.log(res)
      alert("your ticket has been assigned to "+this.selectedUser.firstname + " " + this.selectedUser.lastname)
        this.loading=false
    },
      (err) => {
        this.loading=false
        alert("An error has occured please try again")
        this.router.navigate(['/tickets'])
        console.log(err)},
      () => console.log('done assigning')
    );
  }

  handleDelete() {
    this.services.deleteTicket(this.ticket.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => console.log('done escalating')
    );
  }

  handleResolve() {
    this.services.reassignTicket('').subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => console.log('done escalating')
    );
  }

  getAllUsers() {
    this.services.getAllUsers().subscribe(
      (res) => (this.AllUsers = res),
      (err) => console.log(err),
      () => console.log('done getting users')
    );
  }

  onChange(data: any) {
    console.log(data.value);
    let User = [];

    User = this.AllUsers.filter(
      (user) => user.firstname + ' ' + user.lastname == data.value
    );
    this.selectedUser = User[0];
  }
}
