import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiMsg } from 'src/app/models/apiMsg';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  server : string = "localhost";
  port : string = "5051";

  constructor(private httpClient: HttpClient ) { }

  autenticaService(UserId: string, Password: string)
  {
    let authString: string = "Basic " + window.btoa(UserId + ":" + Password);
    let headers = new HttpHeaders(
      {Authorization: authString}
    );
    return this.httpClient.get<ApiMsg>(
      `http://${this.server}:${this.port}/api/articoli/test`, {headers}).pipe(
        map(
          data =>{
            sessionStorage.setItem("Utente", UserId);
            sessionStorage.setItem("AuthToken", authString);
            return data;
          }
        )
      );
    
  }

  /*autentica = (userid: string, password: string) : boolean => {
    var retval = (userid === "Nicola" && password === "123_stella") ? true : false;
    if(retval){
      sessionStorage.setItem("Utente", userid);
    }
    return retval;
  } */

  loggedUser = () : string | null => sessionStorage.getItem("Utente") ? sessionStorage.getItem("Utente") : "";

  isLogged = () : boolean => sessionStorage.getItem("Utente") ? true : false;

  clearUser = () : void => sessionStorage.removeItem("Utente");

  clearAll = () : void => sessionStorage.clear();
}
