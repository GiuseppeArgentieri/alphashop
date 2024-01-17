import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IArticoli } from 'src/app/models/articoli';

@Injectable({
  providedIn: 'root'
})


export class ArticoliService {
  /*
  articoli: IArticoli[]  = [
    {codart : '014600301', descrizione : 'BARILLA FARINA 1 KG', um : 'PZ', pzcart : 24, peso : 1, prezzo : 1.09, active : true, data : new Date(), imageUrl: 'assets/images/prodotti/014600301.jpg'},
    {codart : "013500121", descrizione : "BARILLA PASTA GR.500 N.70 1/2 PENNE", um : "PZ", pzcart : 30, peso : 0.5, prezzo : 1.3, active : true, data : new Date(), imageUrl: 'assets/images/prodotti/013500121.jpg'},
    {codart : "014649001", descrizione : "BARILLA PANNE RIGATE 500 GR", um : "PZ", pzcart : 12, peso : 0.5, prezzo : 0.89, active : true, data : new Date(), imageUrl: 'assets/images/prodotti/014649001.jpg'},
    {codart : "007686402", descrizione : "FINDUS FIOR DI NASELLO 300 GR", um : "PZ", pzcart : 8, peso : 0.3, prezzo : 6.46, active : true, data : new Date(), imageUrl: 'assets/images/prodotti/007686402.jpg'},
    {codart : "057549001", descrizione : "FINDUS CROCCOLE 400 GR", um : "PZ", pzcart : 12, peso : 0.4, prezzo : 5.97, active : true, data : new Date(), imageUrl: 'assets/images/prodotti/057549001.jpg'},

  ]
  */
 server : string = "localhost";
 port : string = "5051";
  constructor(private httpClient: HttpClient) { }

  //getArticoli = () : IArticoli[] => this.articoli

  getArticoliByDesc = (descrizione: string) => {
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`)
    .pipe(
      map(response => {response.forEach(item => item.idStatoArt = this.getDesStatoArt(item.idStatoArt));
                      return response;
      })
      
    );
  }

  getDesStatoArt = (idStato: string): string => {
    if(idStato === '1')
      return 'Attivo';
    else if(idStato === '2')
      return 'Sospeso';
    else
      return 'Eliminato';
  }

  getArticoliByCode = (codArt: string) =>{
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codArt}`)
    .pipe(
      map(response => {response.idStatoArt = this.getDesStatoArt(response.idStatoArt);
                      return response;
      })
    );
  }

  getArticoliByEan = (barcode: string) =>{
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/ean/${barcode}`)
    .pipe(
      map(response => {response.idStatoArt = this.getDesStatoArt(response.idStatoArt);
                      return response;
      })
    );
  }
  /*
  getArticoliByCode = (codArt: string): IArticoli =>{
    const index = this.articoli.findIndex(articoli => articoli.codart === codArt);
    return this.articoli[index];
  }
  */
}
