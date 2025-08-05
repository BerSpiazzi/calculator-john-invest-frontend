import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputNumber} from "primeng/inputnumber";
import {Select} from "primeng/select";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";

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
                        <p-inputgroup id="vlInicial" required>
                            <p-inputgroup-addon>$</p-inputgroup-addon>
                            <p-inputNumber placeholder="Valor"/>
                            <p-inputgroup-addon>.00</p-inputgroup-addon>
                        </p-inputgroup>
                    </div>

                    <div>
                        <label for="vlInicial">Valor mensal</label>
                        <p-inputgroup required>
                            <p-inputgroup-addon>$</p-inputgroup-addon>
                            <p-inputNumber placeholder="Valor"/>
                            <p-inputgroup-addon>.00</p-inputgroup-addon>
                        </p-inputgroup>
                    </div>

                    <div>
                        <label for="vlInicial">Taxa de juros</label>
                        <p-inputgroup>
                            <p-inputgroup-addon>%</p-inputgroup-addon>
                            <p-inputNumber placeholder="Valor %"/>
                            <p-inputgroup-addon>
                                <p-select [optionValue]="'MENSAL'" [options]="['MENSAL', 'ANUAL']"></p-select>
                            </p-inputgroup-addon>
                        </p-inputgroup>
                    </div>
                    <div>
                        <label for="vlInicial">Período</label>
                        <p-inputgroup>
                            <p-inputgroup-addon><i class="pi pi-calendar"></i></p-inputgroup-addon>
                            <p-inputNumber placeholder="Período"/>
                            <p-inputgroup-addon>
                                <p-select [optionValue]="'MENSAL'" [options]="['MENSAL', 'ANUAL']"></p-select>
                            </p-inputgroup-addon>
                        </p-inputgroup>
                    </div>
                </div>

                <div class="flex items-center justify-start gap-6 mt-4">
                    <p-button>Calcular</p-button>
                    <p-button [outlined]="true">Limpar</p-button>
                </div>

            </div>
        </div>
    `
})
export class CalculatorWidget {


}
