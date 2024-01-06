import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalutiDataService } from 'src/services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  utente: string = "";
  titolo: string = "Benvenuti in alphashop";
  sottotitolo: string = "Visualizza le offerte del giorno";
  constructor(private route: ActivatedRoute, private salutiSrv: SalutiDataService) { }

  ngOnInit(): void {
    this.utente = this.route.snapshot.params['userid'];
  }

  saluti: string = "";
  errore: string = "";

  getSaluti = () : void => {
    this.salutiSrv.getSaluti(this.utente).subscribe(
      //response => this.handleResponse(response)
      {
        next: this.handleResponse.bind(this),
        error: this.handleErrore.bind(this)
      }
    );
  }

  handleResponse(response: object){
    this.saluti = response.toString();
  }

  handleErrore(error: object){
    this.errore = error.toString();
  }

}
