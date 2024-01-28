import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';

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
  constructor(private route: Router, private basicAuth: AuthappService) { }

  ngOnInit(): void {
  }

  gestAut(){
    console.log(this.userid);
    this.basicAuth.autenticaService(this.userid, this.password).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.autenticato = true;
          this.route.navigate(['welcome', this.userid])
        },
        error: (error) => {
          console.log(error);
          this.autenticato = false;
        }
      }
    )
    /*
    if(this.basicAuth.autentica(this.userid, this.password)){
      this.route.navigate(['welcome', this.userid]);
    }
    else{
      this.autenticato = false;
    }
    */
  }


}
