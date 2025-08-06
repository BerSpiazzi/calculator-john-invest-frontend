import {Component} from '@angular/core';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {Result, ResultService} from '../../service/result.service';
import {Subscription} from "rxjs";

@Component({
    standalone: true,
    selector: 'app-result-table-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `
        <div class="card mb-8!">
            <div class="flex justify-center">
                <label class="font-semibold text-xl mb-4 text-primary">Tabela Resultados</label>
            </div>
            <p-table [value]="results" [paginator]="true" [size]="'small'" [rows]="12" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th>Mês</th>
                        <th>Juros</th>
                        <th>Total Investido</th>
                        <th>Total Juros</th>
                        <th>Total Acumulado</th>
                    </tr>
                </ng-template>
                <ng-template #body let-result>
                    <tr>
                        <td style="width: 5%; min-width: 3rem;"> {{ result.mes }}</td>
                        <td style="width: 15%; min-width: 7rem;">{{ result.vlJuros | currency: 'R$' }}</td>
                        <td style="width: 15%; min-width: 7rem;">{{ result.vlTotalInvestido | currency: 'R$' }}</td>
                        <td style="width: 15%; min-width: 7rem;">{{ result.vlTotalJuros | currency: 'R$' }}</td>
                        <td style="width: 15%; min-width: 7rem;">{{ result.vlTotalAcumulado | currency: 'R$' }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>`,
})
export class ResultTableWidget {
    results!: Result[];
    subscription!: Subscription;

    constructor(private readonly resultService: ResultService) {
    }

    ngOnInit() {
        this.subscription = this.resultService.results$.subscribe(data => {
            console.log(data)
            this.results = data;
        });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
