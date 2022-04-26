import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Ticket } from '../shared/models/Ticket';
import { User } from '../shared/models/User';
import { ServicesService } from '../shared/services.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { ComentModel } from '../shared/models/Comment';
import { MessageModel } from '../shared/models/Message';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  ticket!: Ticket;
  AllUsers: User[] = [];
  selectedUser!: User;
  loading = false;
  status: String[] = [];
  escalations: String[] = [];
  momentFomarter = moment;
  user!: User;
  comments: ComentModel[] = [];
  messages: MessageModel[] = [];
  showComments = true;
  searchArrayUsers: User[] = [];
  assignee="";

  constructor(private services: ServicesService, private router: Router) {}

  ngOnInit(): void {
    if(this.services.selectedTicket==null){
      this.router.navigate(['/tickets'])
    }
    this.changeNavLink();
    this.ticket = this.services.selectedTicket;
    this.getAllUsers();
    this.getAllEscalations();
    this.getAllStatus();
    this.getCommentsByTicketId();
    this.getUser();
    this.getAllMessages();
   

  }


  getAssignee(){
   let user = this.AllUsers.filter(user=>user.omUsername==this.services.selectedTicket.assignee)[0]
   
  this.assignee = user.firstname +" "+ user.lastname

  }
  changeNavLink = () => {
    document
      .querySelectorAll('.active')
      .forEach((item) => item.classList.remove('active'));
    document.querySelector('#tickets')?.classList.add('active');
  };

  selectAssignee(event: any) {
    let input = document.querySelector('#selected-uname') as HTMLInputElement;
    input.value = event.innerHTML;
    this.onChange(input.value);
    this.searchArrayUsers = [];
  }

  handleEscalate(val: NgForm) {
    this.loading = true;
    if (
      val.value.escalationLevel == '' ||
      val.value.escalationLevel == 'select'
    ) {
      this.loading = false;
      return;
    }
    const data = {
      escalationLevel: val.value.escalationLevel,
      ticketID: this.ticket.ticketID,
      manager: this.user.manager,
    };
    let comment = val.value.comment;
    let commentPayload = {
      comment: comment,
      creator: this.user.firstname + ' ' + this.user.lastname,
      ticketID: this.ticket.ticketID,
    };

    if (comment != '') {
      this.services.createComment(commentPayload).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        () => console.log()
      );
    }
    this.services.escalateTicket(data).subscribe(
      (res) => {
        Swal.fire(
          'Success!',
          'Your ticket has been escaleted to  ' + data.escalationLevel,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
     
    );
  }

  handleReassign(val: NgForm) {
    this.loading = true;
    if (this.selectedUser == null) {
      this.loading = false;
      return;
    }
    const data = {
      assignee: this.selectedUser.omUsername,
      ticketID: this.ticket.ticketID,
    };

    let comment = val.value.comment;
    let commentPayload = {
      comment: comment,
      creator: this.user.firstname + ' ' + this.user.lastname,
      ticketID: this.ticket.ticketID,
    };


    if (comment != '') {
      this.services.createComment(commentPayload).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
      );
    }

    this.services.reassignTicket(data).subscribe(
      (res) => {
        Swal.fire(
          'Success!',
          'Your ticket has been assigned to  ' +
            this.selectedUser.firstname +
            ' ' +
            this.selectedUser.lastname,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      () => console.log('done assigning')
    );
  }

  handleDelete() {
    this.services.deleteTicket(this.ticket.ticketID).subscribe(
      (res) => {
        Swal.fire(
          'Success!',
          'You have successfully deleted a ticket with ID ' + this.ticket.ticketID,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },

    );
  }

  handleChangeStatus(form: NgForm) {
    this.loading = true;
    if (form.value.ticketStatus == '' || form.value.ticketStatus == 'select') {
      this.loading = false;
      return;
    }

    const data = { ...form.value, id: this.ticket.ticketID };
    if (form.value.ticketStatus == 'RESOLVED') {
      this.services
        .escalateTicket({
          escalationLevel: 'NORMAL',
          ticketID: this.ticket.ticketID,
          manager: this.user.manager,
        })
        .subscribe(
          (res) => {
            this.services.changeStatus(data).subscribe(
              (res) => {

                Swal.fire(
                  'Success!',
                  'Your ticket status has been changed to : ' +
                    form.value.ticketStatus,
                  'success'
                ).then((result) => {
                  if (result.isConfirmed) {
                    this.loading = false;
                  }
                });
              },
              (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'An error has occured please try again',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.loading = false;
                  }
                });
                console.log(err);
              },
            
            );
  
          },
          (err) => console.log(err),
         
        );
    } else {
      this.services.changeStatus(data).subscribe(
        (res) => {
          

          Swal.fire(
            'Success!',
            'Your ticket status has been changed to : ' +
              form.value.ticketStatus,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.loading = false;
            }
          });
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has occured please try again',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.loading = false;
            }
          });
          console.log(err);
        },
  
      );
    }
  }

  getAllUsers() {
    this.services.getAllUsers().subscribe(
      (res) => {
       
        this.AllUsers = res
        this.getAssignee();
      },
      (err) => console.log(err),
    
    );
  }

  onChange(data: any) {
    if (data == '') {
      return;
    }
    let User = [];

    User = this.AllUsers.filter(
      (user) =>
        user.firstname.toLocaleLowerCase().trim() +
          ' ' +
          user.lastname.toLocaleLowerCase().trim() ==
        data.toLocaleLowerCase().trim()
    );
    this.selectedUser = User[0];
  }

  getAllStatus() {
    this.services.getAllStatus().subscribe(
      (res) => {
        this.status = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllEscalations() {
    this.services.getAllEscalations().subscribe(
      (res) => {
        this.escalations = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUser() {
    const data = sessionStorage.getItem('user');
    this.user = JSON.parse(data || '{}');
  }

getCommentsByTicketId() {
    this.services.getAllCommentsByTicketId(this.ticket.ticketID).subscribe(
      (res) => {
        this.comments = res;


      },
      (err) => console.log(err),
      () => console.log('done getting commnents')
    );
  }

  sendMessagetoClient(form: NgForm) {
    this.loading=true;
    let data: MessageModel = {
      creator: this.user.firstname + ' ' + this.user.lastname,
      dateCreated: new Date(),
      message: form.value.message,
      phone: this.ticket.phone,
      ticketID: this.ticket.ticketID,
    };

    this.services.sendMessageToClient(data).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Success!',
          'Your message has been sent successfully ',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error has occured please try again',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.loading = false;
          }
        });
      },
      () => console.log('done sending message')
    );
  }

  toggleShowComments(val: boolean) {
    this.showComments = val;
  }

  getAllMessages() {
    this.services.getMessagesByTicketId(this.ticket.ticketID).subscribe(
      (res) => {
        this.messages = res;
      },
      (err) => console.log(err),
      () => console.log('done getting messages')
    );
  }

  handleSearch(event: any) {
    this.searchArrayUsers = this.AllUsers.filter(
      (user) =>
        user.firstname.toLocaleLowerCase().substring(0, event.value.length) ==
          event.value.toLocaleLowerCase() ||
        user.lastname.toLowerCase().substring(0, event.value.length) ==
          event.value.toLocaleLowerCase()
    );
    console.log(this.searchArrayUsers);
  }
}
