import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }

  autentica = (userid: string, password: string) : boolean => {
    var retval = (userid === "Nicola" && password === "123_stella") ? true : false;
    if(retval){
      sessionStorage.setItem("Utente", userid);
    }
    return retval;
  }

  loggedUser = () : string | null => sessionStorage.getItem("Utente") ? sessionStorage.getItem("Utente") : "";

  isLogged = () : boolean => sessionStorage.getItem("Utente") ? true : false;

  clearUser = () : void => sessionStorage.removeItem("Utente");

  clearAll = () : void => sessionStorage.clear();
}
