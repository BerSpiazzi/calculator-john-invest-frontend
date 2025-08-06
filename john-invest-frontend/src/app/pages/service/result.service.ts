import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Result {
    id?: string;
    mes: number;
    vlJuros: number;
    vlTotalInvestido: number;
    vlTotalJuros: number;
    vlTotalAcumulado: number;
}

export interface ResumoResultados {
    vlTotalFinal: number;
    vlTotalInvestido: number;
    vlTotalJuros: number;
}


@Injectable({
    providedIn: 'root'
})
export class ResultService {

    private resultsSubject = new BehaviorSubject<Result[]>([]);
    results$ = this.resultsSubject.asObservable();

    private resumoSubject = new BehaviorSubject<ResumoResultados>({
        vlTotalFinal: 0,
        vlTotalInvestido: 0,
        vlTotalJuros: 0
    });
    resumo$ = this.resumoSubject.asObservable();

    setResults(results: Result[]) {
        this.resultsSubject.next(results);
        this.atualizarResumo(results);
    }

    clearResults() {
        this.resultsSubject.next([]);
        this.resumoSubject.next({
            vlTotalFinal: 0,
            vlTotalInvestido: 0,
            vlTotalJuros: 0
        });
    }

    private atualizarResumo(results: Result[]) {
        const ultimo = results[results.length - 1];

        if (ultimo) {
            this.resumoSubject.next({
                vlTotalFinal: ultimo.vlTotalAcumulado || ultimo.vlTotalInvestido,
                vlTotalInvestido: ultimo.vlTotalInvestido,
                vlTotalJuros: ultimo.vlTotalJuros
            });
        }
    }
}
