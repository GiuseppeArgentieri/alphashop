import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMsg } from 'src/app/models/apiMsg';
import { IArticoli, ICat, IIva } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title : string = "";
  isModifica: boolean = false;

  CodArt: string = '';
  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    codStat: '',
    um: '-1',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: "1",
    desStatoArt:"",
    dataCreazione: new Date(),
    imageUrl: '',
    idFamAss: -1,
    idIva: -1,
    ean: []
  };
  Iva: IIva[] = [];
  Cat: ICat[] = [];
  ean: string = "";
  apiMsg!: ApiMsg;
  conferma: string = "";
  errore: string = "";
  constructor(private route: ActivatedRoute, private articoliService: ArticoliService, private router: Router) { }

  ngOnInit(): void {

    this.CodArt =  this.route.snapshot.params['codart'];

    if(this.CodArt){
    console.log("Selezionato articolo " + this.CodArt);
    this.title = "Modifica Articoli";
    this.isModifica = true;
    this.articoliService.getArticoliByCode(this.CodArt).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
    }
    else{
      this.title = "Creazione Articolo";
      this.isModifica = false;
    }

    this.articoliService.getIva().subscribe(
      response => {
        this.Iva = response;
        console.log(response);
      }
    );
    
    this.articoliService.getCat().subscribe(
      response => {
        this.Cat = response;
        console.log(response);
      }
    );

  }

  handleResponse(response : any) {
    this.articolo = response;
    this.ean = (this.articolo.ean)? this.articolo.ean[0].barcode : "";
    console.log(this.articolo);
  }

  handleError(error: any) {
    console.log(error);
  }

  salva(){
    this.errore = "";
    this.conferma = "";
    console.log(this.articolo);
    if(this.isModifica)
    {
      this.articoliService.updArticolo(this.articolo).subscribe({
        next: (response) => {
          this.apiMsg = response;
          //console.log(this.apiMsg.message);
          this.conferma = this.apiMsg.message;
        },
        error: (error) => {
          console.log(error);
          this.apiMsg = error.error;
          this.errore = this.apiMsg.message;
        }
      }
      )
    }
    else
    {
      this.articoliService.insArticolo(this.articolo).subscribe({
        next: (response) => {
          this.apiMsg = response;
          //console.log(this.apiMsg.message);
          this.conferma = this.apiMsg.message;
        },
        error: (error) => {
          console.log(error);
          this.apiMsg = error.error;
          this.errore = this.apiMsg.message;
        }
      }
      )
    }
    
  }

  abort(){
    if(this.isModifica)
    {
      this.router.navigate(['articoli'], {queryParams: {filter: this.CodArt}});
    }
    else
    {
      this.router.navigate(['articoli']);
    }
  }

}