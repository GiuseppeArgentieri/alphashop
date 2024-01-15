import { Component, OnInit } from '@angular/core';
import { IArticoli } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {
  articoli$: IArticoli[] = [];
  errore: string = "";
  constructor(private articoliService: ArticoliService) { }

  ngOnInit(): void {
    this.articoliService.getArticoliByDesc('Barilla').subscribe(
      {next: this.handleResponse.bind(this),
      error: this.handleErrore.bind(this)
      }
    );
  }
  handleEdit = (codart: string) => {
    console.log("hai cliccati edit relativo al codice " + codart);
  }

  handleDelete = (codart: string) => {
    console.log("hai cliccati delete relativo al codice " + codart);
    this.articoli$.splice(this.articoli$.findIndex(x => x.codArt === codart), 1);
    console.log(this.articoli$);
  }
  handleResponse(response: IArticoli[]){
    this.articoli$ = response;
  }

  handleErrore(error: Object){
    this.errore = error.toString();
  }
}
