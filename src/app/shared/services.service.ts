import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/Ticket';
import { HttpHeaders } from '@angular/common/http';
import { User } from './models/User';
import { ComentModel } from './models/Comment';
import { MessageModel } from './models/Message';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  selectedTicket!:Ticket 
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('lrsusername:lrsadminpassword')
    })
  };
   //url = "http://localhost:8080/whatsappbot/" 
   url = "https://9143-196-44-186-171.ngrok.io/whatsappbot/"

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

  changeStatus(data:any){
    return this.http.post(this.url+'internal/changestatus',data,this.httpOptions)
  }


  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+'users/all', this.httpOptions)
  }

  getAllTicketsAssigned(omUsername:string):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.url+'internal/getticketsbyassignee/'+omUsername, this.httpOptions)
  }

  signOut(){
    sessionStorage.removeItem('user');
  }

  getAllStatus():Observable<String[]>{
   return this.http.get<String[]>(this.url+'constants/ticket-statuses', this.httpOptions)
  }

  getAllEscalations():Observable<String[]>{
    return this.http.get<String[]>(this.url+'constants/escalation-levels', this.httpOptions)
   }

   getAllTicketTypes():Observable<String[]>{
    return this.http.get<String[]>(this.url+'constants/ticket-types', this.httpOptions)
   }

   createComment(data:any):Observable<ComentModel>{
     return this.http.post<ComentModel>(this.url+"comments/create",data,this.httpOptions)
   }

   getAllCommentsByTicketId(ticketId:string):Observable<ComentModel[]>{
    return this.http.get<ComentModel[]>(this.url+"comments/"+ticketId,this.httpOptions)
  }

  sendMessageToClient(message:MessageModel):Observable<MessageModel>{
    return this.http.post<MessageModel>(this.url+"messages/send",message,this.httpOptions)
  }

  
  getMessagesByTicketId(id:string):Observable<MessageModel[]>{
    return this.http.get<MessageModel[]>(this.url+"messages/"+id,this.httpOptions)
  }
}