import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface Result {
    id?: string;
    mes: number;
    vlJuros: number;
    vlTotalInvestido: number;
    vlTotalJuros: number;
    vlTotalAcumulado: number;
}

@Injectable()
export class ResultService {

    getResultData() {
        return [
            {
                id: '1000',
                mes: 1,
                vlJuros: 50.00,
                vlTotalInvestido: 1000.00,
                vlTotalJuros: 50.00,
                vlTotalAcumulado: 1050.00
            },
            {
                id: '1000',
                mes: 2,
                vlJuros: 52.50,
                vlTotalInvestido: 2000.00,
                vlTotalJuros: 102.50,
                vlTotalAcumulado: 2102.50
            },
            {
                id: '1000',
                mes: 3,
                vlJuros: 105.13,
                vlTotalInvestido: 3000.00,
                vlTotalJuros: 207.63,
                vlTotalAcumulado: 3207.63
            },
            {
                id: '1000',
                mes: 4,
                vlJuros: 160.38,
                vlTotalInvestido: 4000.00,
                vlTotalJuros: 368.01,
                vlTotalAcumulado: 4368.01
            },
            {
                id: '1000',
                mes: 5,
                vlJuros: 218.40,
                vlTotalInvestido: 5000.00,
                vlTotalJuros: 586.41,
                vlTotalAcumulado: 5586.41
            },
            {
                id: '1000',
                mes: 6,
                vlJuros: 279.32,
                vlTotalInvestido: 6000.00,
                vlTotalJuros: 865.73,
                vlTotalAcumulado: 6865.73
            },
            {
                id: '1000',
                mes: 7,
                vlJuros: 343.29,
                vlTotalInvestido: 7000.00,
                vlTotalJuros: 1209.02,
                vlTotalAcumulado: 8209.02
            },
            {
                id: '1000',
                mes: 8,
                vlJuros: 410.45,
                vlTotalInvestido: 8000.00,
                vlTotalJuros: 1619.47,
                vlTotalAcumulado: 9619.47
            },
            {
                id: '1000',
                mes: 9,
                vlJuros: 480.97,
                vlTotalInvestido: 9000.00,
                vlTotalJuros: 2100.44,
                vlTotalAcumulado: 11100.44
            },
            {
                id: '1000',
                mes: 10,
                vlJuros: 555.02,
                vlTotalInvestido: 10000.00,
                vlTotalJuros: 2655.46,
                vlTotalAcumulado: 12655.46
            },
            {
                id: '1000',
                mes: 11,
                vlJuros: 632.77,
                vlTotalInvestido: 11000.00,
                vlTotalJuros: 3288.23,
                vlTotalAcumulado: 14288.23
            },
            {
                id: '1000',
                mes: 12,
                vlJuros: 714.41,
                vlTotalInvestido: 12000.00,
                vlTotalJuros: 4002.64,
                vlTotalAcumulado: 16002.64
            }
        ];
    }

    constructor(private http: HttpClient) {
    }

    getResult() {
        return Promise.resolve(this.getResultData().slice(0, 10));
    }

}
