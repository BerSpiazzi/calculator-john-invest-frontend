import {Component, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppService} from './app.service';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-root',
  imports: [
    DecimalPipe,
    FormsModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('john-invest-frontend');

  valorInicial = 0;
  aporteMensal = 0;
  taxaJuros = 0;
  tempo = 0;
  periodicidade = 'mensal';
  resultados: any[] = [];

  constructor(
    private readonly appService: AppService
  ) {
  }

  calcular() {
    let tempoConvertido = this.tempo;

    if (this.periodicidade === 'anual') {
      tempoConvertido = this.tempo * 12;
    }

    const payload = {
      valorInicial: this.valorInicial,
      aporteMensal: this.aporteMensal,
      taxaJuros: this.taxaJuros,
      tempo: tempoConvertido
    };

    this.appService.calculate(payload).subscribe(data => {
      this.resultados = data;
    });
  }
}
