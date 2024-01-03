import { Component, OnInit } from '@angular/core';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public basicAuth: AuthappService) { }
  //queste variabili non sono refreshate ma inizializzate solo una volta - per refresharle automaticamente occorre inserirle nel codice html
  //isLog: boolean = this.basicAuth.isLogged();
  //user = this.basicAuth.loggedUser();
  
  ngOnInit(): void {
  }



}
