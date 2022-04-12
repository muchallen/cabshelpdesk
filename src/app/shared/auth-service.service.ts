import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


   // ...
   public isAuthenticated(): boolean {
     

     const token = localStorage.getItem('user'||false);
     if(token)
    return true;
    else
    return false;
  }
}
