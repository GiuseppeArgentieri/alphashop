import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticoli } from 'src/app/models/articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent implements OnInit {
  
  constructor() { }

  @Input()
  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    codStat: '',
    um: '',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: "1",
    dataCreazione: new Date(),
    imageUrl: ''
  }

  @Output()
  delete = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  ngOnInit(): void {
  }
  
  editArt = () => this.edit.emit(this.articolo.codArt);
  delArt = () => this.delete.emit(this.articolo.codArt);
}
