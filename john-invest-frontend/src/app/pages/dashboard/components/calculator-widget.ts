import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputNumber} from "primeng/inputnumber";
import {Select} from "primeng/select";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {Result, ResultService} from "@/pages/service/result.service";
import {MessageService} from "primeng/api";

export enum PeridiocidadeEnum {
    MENSAL = "MENSAL",
    ANUAL = "ANUAL"
}

@Component({
    standalone: true,
    selector: 'app-calculator-widget',
    imports: [CommonModule, InputGroup, InputGroupAddon, InputNumber, Select, Button, FormsModule],
    template: `
        <div class="col-span-12 lg:col-span-12 xl:col-span-12 flex justify-center">
            <div class="card mb-0">
                <div class="flex justify-center mb-4">
                    <h1 class="font-medium mb-4">Simulador de Juros Compostos</h1>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label for="vlInicial">Valor inicial</label>
                        <p-inputgroup id="vlInicial">
                            <p-inputgroup-addon>$</p-inputgroup-addon>
                            <p-inputNumber
                                required
                                [(ngModel)]="vlInicial"
                                mode="decimal"
                                minFractionDigits="2"
                                maxFractionDigits="2"
                                placeholder="0.00"
                            />
                        </p-inputgroup>
                    </div>

                    <div>
                        <label for="vlMensal">Valor mensal</label>
                        <p-inputgroup>
                            <p-inputgroup-addon>$</p-inputgroup-addon>
                            <p-inputNumber
                                [(ngModel)]="vlMensal"
                                mode="decimal"
                                minFractionDigits="2"
                                maxFractionDigits="2"
                                placeholder="0.00"/>
                        </p-inputgroup>
                    </div>
                    <div>
                        <label for="vlTaxaJuros">Taxa de juros</label>
                        <p-inputgroup>
                            <p-inputgroup-addon>%</p-inputgroup-addon>
                            <p-inputNumber
                                required
                                [(ngModel)]="vlTaxaJuros"
                                mode="decimal"
                                minFractionDigits="2"
                                maxFractionDigits="2"
                                placeholder="0.00"/>
                            <p-inputgroup-addon>
                                <p-select [(ngModel)]="tpPeriodoTaxa" [options]="peridiocidade"></p-select>
                            </p-inputgroup-addon>
                        </p-inputgroup>
                    </div>
                    <div>
                        <label for="vlInicial">Período</label>
                        <p-inputgroup>
                            <p-inputgroup-addon><i class="pi pi-calendar"></i></p-inputgroup-addon>
                            <p-inputNumber required [(ngModel)]="tempo" placeholder="Período"/>
                            <p-inputgroup-addon>
                                <p-select [(ngModel)]="tpPeriodoTempo" [options]="peridiocidade"></p-select>
                            </p-inputgroup-addon>
                        </p-inputgroup>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-6 mt-4">
                    <p-button (onClick)="calcular()">Calcular</p-button>
                    <p-button [outlined]="true" (onClick)="limpar()">Limpar</p-button>
                </div>

            </div>
        </div>
    `
})
export class CalculatorWidget {

    constructor(
        private readonly resultService: ResultService,
        private messageService: MessageService,
    ) {
    }

    peridiocidade: string[] = Object.values(PeridiocidadeEnum);
    vlInicial: number | undefined;
    vlMensal: number | undefined;
    vlTaxaJuros: number | undefined;
    tempo: number | undefined;
    tpPeriodoTaxa = PeridiocidadeEnum.ANUAL;
    tpPeriodoTempo = PeridiocidadeEnum.MENSAL;

    calcular() {

        this.vlInicial ??= 0;
        this.vlMensal ??= 0;
        this.validateCampos()

        this.resultService.clearResults();

        const tempoMeses = this.tpPeriodoTempo === PeridiocidadeEnum.ANUAL ? this.tempo! * 12 : this.tempo!;
        const taxaMensal = this.tpPeriodoTaxa === PeridiocidadeEnum.ANUAL ? this.vlTaxaJuros! / 12 : this.vlTaxaJuros!;

        const i = taxaMensal / 100;

        const resultados: Result[] = [];

        for (let mes = 1; mes <= tempoMeses; mes++) {

            const montanteInicial = this.vlInicial! * Math.pow(1 + i, mes);

            const montanteAportes = mes > 1 && i > 0
                ? this.vlMensal! * ((Math.pow(1 + i, mes - 1) - 1) / i)
                : this.vlMensal! * (mes - 1); // se i == 0, cálculo simplificado (sem juros)

            const montanteFinal = montanteInicial + montanteAportes;

            const totalInvestido = this.vlInicial! + this.vlMensal! * (mes - 1);
            const totalJuros = montanteFinal - totalInvestido;

            resultados.push({
                mes,
                vlJuros: totalJuros - (resultados[mes - 2]?.vlTotalJuros || 0) || 0,
                vlTotalInvestido: totalInvestido,
                vlTotalJuros: totalJuros || 0,
                vlTotalAcumulado: montanteFinal || 0
            });
        }

        this.resultService.setResults(resultados);
    }

    private validateCampos() {

        if (this.vlTaxaJuros === undefined || this.vlTaxaJuros === 0) {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Taxa de juros obrigatória'});
            return;
        }
        if (this.tempo === undefined || this.tempo === 0) {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Período obrigatório'});
        }
    }


    limpar() {
        this.vlInicial = 0;
        this.vlMensal = 0;
        this.vlTaxaJuros = 0;
        this.tempo = 0;
        this.resultService.setResults([]);
    }

}
