export interface IArticoli{
    codArt: string
    descrizione: string
    um: string
    codStat: string
    pzCart: number
    pesoNetto: number
    prezzo: number
    idStatoArt: string
    desStatoArt: string
    dataCreazione: Date
    imageUrl: string
    idFamAss: number
    idIva: number
    ean: IBarCode[]
}

export interface IIva{
    idIva: number,
    descrizione: string,
    aliquota: number
}

export interface ICat{
    id: number,
    descrizione: string
}

export interface IBarCode{
    barcode: string,
    idTipoArt: string
}