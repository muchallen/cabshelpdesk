import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/Ticket';
import { HttpHeaders } from '@angular/common/http';
import { User } from './models/User';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  selectedTicket:Ticket ={
    id:'',
    dateCreated:new Date,
    lastUpdated:'',
    closedAt:'',
    ticketType:'',
    assignee:'',
    escalationLevel:'',
    ticketStatus:'',
    estimatedResolutionTime: "" ,
    actualResolutionTime:    0,
    dailyReportSent: false,
    name:'',
    phone:'',
    email:'',
    businessUnit:'',
    description:''
  }


   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('lrsusername:lrsadminpassword')
    })
  };
   url = "http://localhost:8080/whatsappbot/"


  constructor(private http:HttpClient) { 

  }



  getAllTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.url+'internal/alltickets', this.httpOptions);
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.url+'users/create',user,this.httpOptions)
  }

  signInUser(credentials:any):Observable<User>{
    return this.http.post<User>(this.url+'users/login',credentials,this.httpOptions)
  }

  deleteTicket(id:string){
    return this.http.delete(this.url+'internal/deleteticket/'+id,{...this.httpOptions, params:{id}})
  }

  escalateTicket(data:any){
    return this.http.post(this.url+'internal/escalate',data,this.httpOptions)
  }

  reassignTicket(data:any){
    return this.http.post(this.url+'internal/reassign',data,this.httpOptions)
  }

  resolveTicket(data:any){
    return this.http.post(this.url+'internal/resolve',data,this.httpOptions)
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+'users/all', this.httpOptions)
  }

}
