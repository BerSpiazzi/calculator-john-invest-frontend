import {Component} from '@angular/core';
import {ResultWidget} from './components/result-widget';
import {CalculatorWidget} from './components/calculator-widget';
import {ResultTableWidget} from './components/result-table-widget';
import {ResultGraphWidget} from './components/result-graph-widget.component';

@Component({
    selector: 'app-dashboard',
    imports: [CalculatorWidget, ResultTableWidget, ResultGraphWidget, ResultWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            @if (result) {
                <app-calculator-widget class="contents"/>
            }
            @if (!result) {
                <div class="col-span-12 xl:col-span-6">
                    <app-calculator-widget class="contents"/>
                </div>

                <div class="col-span-12 xl:col-span-6 flex justify-center">
                    <app-result-widget/>
                </div>

                <div class="col-span-12 xl:col-span-6">
                    <app-result-table-widget/>
                </div>
                <div class="col-span-12 xl:col-span-6">
                    <app-result-graph-widget/>
                </div>
            }
        </div>
    `
})
export class Dashboard {

    result: boolean = false;
}
