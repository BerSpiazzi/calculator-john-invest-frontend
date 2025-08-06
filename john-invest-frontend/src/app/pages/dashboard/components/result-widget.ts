import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {ResultService, ResumoResultados} from "@/pages/service/result.service";
import {Observable} from "rxjs";
import {AsyncPipe, CurrencyPipe} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-result-widget',
    imports: [ButtonModule, MenuModule, CurrencyPipe, AsyncPipe],
    template: `
        <div class="card">

            <div class="flex justify-center m-1">
                <label class="font-semibold text-xl text-primary">Resultados Gerais</label>
            </div>

            <div class="flex justify-center">
                @let resumo = (resumo$ | async);
                @if (resumo) {
                    <div class="grid grid-rows-1 md:grid-rows-3">
                        <div class="m-2">
                            <div class="card mb-0 border border-primary-800">
                                <div class="flex flex-col items-center p-4">
                                    <label class="block font-medium mb-2">Valor Total Final</label>
                                    <label class="font-medium">{{ resumo.vlTotalFinal | currency: 'BRL':'symbol':'1.2-2' }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="m-2">
                            <div class="card mb-0 border border-primary-500">
                                <div class="flex flex-col items-center p-4">
                                    <label class="block font-medium mb-2">Valor Total Investido</label>
                                    <label class="font-medium">{{ resumo.vlTotalInvestido | currency: 'BRL':'symbol':'1.2-2' }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="m-2">
                            <div class="card mb-0 border border-primary-200">
                                <div class="flex flex-col items-center p-4">
                                    <label class="block font-medium mb-2">Total em Juros</label>
                                    <label class="font-medium">{{ resumo.vlTotalJuros | currency: 'BRL':'symbol':'1.2-2' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    `
})
export class ResultWidget implements OnInit {

    resumo$!: Observable<ResumoResultados>;

    constructor(private readonly resultService: ResultService) {
    }

    ngOnInit(): void {
        this.resumo$ = this.resultService.resumo$;
    }
}
