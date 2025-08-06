import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {debounceTime, Subscription} from 'rxjs';
import {LayoutService} from '../../../layout/service/layout.service';
import {Result, ResultService} from '../../service/result.service';
import {CommonModule} from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-result-graph-widget',
    imports: [ChartModule, CommonModule],
    template: `
        <div class="card mb-8!">
            <div class="flex justify-center">
                <label class="font-semibold text-xl mb-4 text-primary">Gráfico Resultados</label>
            </div>
            <p-chart type="line" [data]="chartData" [options]="chartOptions" class="h-100"/>
        </div>`
})
export class ResultGraphWidget implements OnInit, OnDestroy {
    chartData: any;
    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private layoutService: LayoutService,
        private resultService: ResultService
    ) {
    }

    ngOnInit() {
        this.subscription = this.resultService.results$.subscribe((results: Result[]) => {
            this.initChart(results);
        });

        this.subscription.add(
            this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
                this.initChart(this.resultService['resultsSubject'].value);
            })
        );
    }

    initChart(results: Result[]) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        const totalMeses = results.length;

        // Labels condicional
        const labels = totalMeses <= 24
            ? results.map(r => `M${r.mes}`)
            : results
            .filter(r => r.mes % 12 === 0) // mostra apenas anos completos
            .map(r => `A${r.mes / 12}`);

        // Dados compatíveis com os labels (precisa ajustar também)
        const investido = totalMeses <= 24
            ? results.map(r => r.vlTotalInvestido)
            : results.filter(r => r.mes % 12 === 0).map(r => r.vlTotalInvestido);

        const acumulado = totalMeses <= 24
            ? results.map(r => r.vlTotalAcumulado)
            : results.filter(r => r.mes % 12 === 0).map(r => r.vlTotalAcumulado);

        this.chartData = {
            labels,
            datasets: [
                {
                    label: 'Total Investido',
                    data: investido,
                    borderColor: documentStyle.getPropertyValue('--p-primary-800'),
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-800'),
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'Total com Juros',
                    data: acumulado,
                    borderColor: documentStyle.getPropertyValue('--p-primary-400'),
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: false
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent'
                    }
                },
                y: {
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.3,
                    fill: false
                },
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        };
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
