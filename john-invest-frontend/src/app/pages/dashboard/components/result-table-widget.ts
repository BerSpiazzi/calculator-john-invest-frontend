import {Component} from '@angular/core';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {Result, ResultService} from '../../service/result.service';

@Component({
    standalone: true,
    selector: 'app-result-table-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `
        <div class="card mb-8!">
            <div class="font-semibold text-xl mb-4">Tabela Resultados</div>
            <p-table [value]="results" [paginator]="true" [rows]="24" responsiveLayout="scroll">
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
                        <td style="width: 15%; min-width: 5rem;"> {{ result.mes }}</td>
                        <td style="width: 35%; min-width: 7rem;">{{ result.vlJuros | currency: 'R$' }}</td>
                        <td style="width: 35%; min-width: 8rem;">{{ result.vlTotalInvestido | currency: 'R$' }}</td>
                        <td style="width: 15%;">{{ result.vlTotalJuros | currency: 'R$' }}</td>
                        <td style="width: 15%;">{{ result.vlTotalAcumulado | currency: 'R$' }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>`,
    providers: [ResultService]
})
export class ResultTableWidget {
    results!: Result[];

    constructor(private readonly resultService: ResultService) {
    }

    ngOnInit() {
        this.resultService.getResult().then((data) => (this.results = data));
    }
}
