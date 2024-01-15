import { Component, OnInit } from '@angular/core';
import { IArticoli } from '../../models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {
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

  handleResponse(response: IArticoli[]){
    this.articoli$ = response;
  }

  handleErrore(error: Object){
    this.errore = error.toString();
  }

}
