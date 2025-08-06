import {Component, computed} from '@angular/core';
import {ResultWidget} from './components/result-widget';
import {CalculatorWidget} from './components/calculator-widget';
import {ResultTableWidget} from './components/result-table-widget';
import {ResultGraphWidget} from './components/result-graph-widget';
import {ResultService} from "@/pages/service/result.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-dashboard',
    imports: [CalculatorWidget, ResultTableWidget, ResultGraphWidget, ResultWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-calculator-widget class="contents"/>
            @if (hasResults()) {

                <div class="col-span-12 lg:col-span-4">
                    <app-result-widget/>
                </div>

                <div class="col-span-12 xl:col-span-8">
                    <app-result-table-widget/>
                </div>
                <div class="col-span-12 xl:col-span-12">
                    <app-result-graph-widget/>
                </div>
            }
        </div>
    `
})
export class Dashboard {

    results;
    hasResults;

    constructor(public resultService: ResultService) {
        this.results = toSignal(this.resultService.results$, {initialValue: []});
        this.hasResults = computed(() => this.results().length > 0);
    }
}
