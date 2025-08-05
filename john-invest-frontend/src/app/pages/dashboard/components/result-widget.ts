import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-result-widget',
    imports: [ButtonModule, MenuModule],
    template: `
        <div class="card">
            <div class="flex justify-center">
                <h1 class="font-medium">Resultados</h1>
            </div>
            <div class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-3">
                    <div class="m-4">
                        <div class="card mb-0" style="background-color: #bfa57c">
                            <div class="flex justify-center">
                                <div class="flex flex-col items-center">
                                    <label class="block font-medium mb-2">Valor Total Final</label>
                                    <label class="font-medium">R$ 12.000</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-4">
                        <div class="card mb-0">
                            <div class="flex justify-center">
                                <div class="flex flex-col items-center">
                                    <label class="block font-medium mb-2">Valor Total Investido</label>
                                    <label class="font-medium">R$ 80.000</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-4">
                        <div class="card mb-0">
                            <div class="flex justify-center ">
                                <div class="flex flex-col items-center">
                                    <label class="block font-medium mb-2">Total em juros</label>
                                    <label class="font-medium">R$ 12.000</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class ResultWidget {
    items = [
        {label: 'Add New', icon: 'pi pi-fw pi-plus'},
        {label: 'Remove', icon: 'pi pi-fw pi-trash'}
    ];
}
