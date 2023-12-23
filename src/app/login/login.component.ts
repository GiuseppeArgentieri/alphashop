import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userid: string = 'Nicola'
  password: string = ''
  autenticato: boolean = true;
  errMsg: string = "Spiacente, la userid e/o la password sono errati";
  titolo : string = "Accesso & Autenticazione";
  sottotitolo : string = "Procedi ad inserire la userid e la password";
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  gestAut(){
    console.log(this.userid);
    if(this.userid === "Nicola" && this.password=="123_stella"){
      this.route.navigate(['welcome', this.userid]);
    }
    else{
      this.autenticato = false;
    }
  }

}
