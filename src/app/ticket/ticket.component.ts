import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';
import moment  from 'moment' ;
import Swal from 'sweetalert2';


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
  status:String[]=[]
  escalations:String[]=[]
  momentFomarter = moment

  constructor(private services: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.changeNavLink();
    this.ticket = this.services.selectedTicket;
    this.getAllUsers();
    this.getAllEscalations();
    this.getAllStatus();
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
      (res) => {
        Swal.fire(
          'Success!',
          "Your ticket has been escalated to "+val.value.escalationLevel,
          'success'
        ).then(result=>{
          if(result.isConfirmed){
            this.loading=false
          }
        })
        
      },
      (err) => {console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
              if(result.isConfirmed){
                this.loading=false
              }
         
          })
        }
      ,
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
        Swal.fire(
          'Success!',
          "Your ticket has been assigned to  "+this.selectedUser.firstname + " " + this.selectedUser.lastname,
          'success'
        ).then(result=>{
          if(result.isConfirmed){
            this.loading=false
          }
        })
    },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
              if(result.isConfirmed){
                this.loading=false
              }
         
          })},
      () => console.log('done assigning')
    );
  }

  handleDelete() {
    this.services.deleteTicket(this.ticket.id).subscribe(
      (res) => {console.log(res)
        Swal.fire(
          'Success!',
          "You have successfully deleted a ticket with ID "+ this.ticket.id,
          'success'
        ).then(result=>{
          if(result.isConfirmed){
            this.loading=false
          }
        })
      
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
              if(result.isConfirmed){
                this.loading=false
              }
         
          })
      },
      () => console.log('done escalating')
    );
  }

  handleChangeStatus(form:NgForm) {
    this.loading=true;
    console.log(form.value)
    
   
   const data={...form.value,id:this.ticket.id}
   if(form.value.ticketStatus=="RESOLVED")
   {
     alert("HELlo")
    this.services.escalateTicket({escalationLevel:"NORMAL",id:this.ticket.id}).subscribe(res=>console.log(res), err=>console.log(err),()=>console.log("done escalating"))
   }
    this.services.changeStatus(data).subscribe(
      (res) => {console.log(res)
       
        Swal.fire(
          'Success!',
          "Your ticket status has been changed to : " +form.value.ticketStatus,
          'success'
        ).then(result=>{
          if(result.isConfirmed){
            this.loading=false
          }
        })
        },
          (err) => {  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has occured please try again',
            confirmButtonText: 'OK',
          }).then((result) => {
                if(result.isConfirmed){
                  this.loading=false
                }
           
            })
            console.log(err)},
          () => console.log('done updating status')
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

  getAllStatus(){
    this.services.getAllStatus().subscribe(res=>{
      this.status=res
    },err=>{
      console.log(err)
    },
    )
  }

  getAllEscalations(){
    this.services.getAllEscalations().subscribe(res=>{
      this.escalations=res
    },err=>{
      console.log(err)
    },
    )
  }


  // onChangeStatus(data: any){
  //   console.log(data.value);
  //   let status = [];

  //   User = this.AllUsers.filter(
  //     (user) => user.firstname + ' ' + user.lastname == data.value
  //   );
  //   this.selectedUser = User[0];
  // }

  
}
