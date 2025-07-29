import {Component, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    DecimalPipe,
    FormsModule
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
  resultados: any[] = [];

  constructor(private http: HttpClient) {
  }

  calcular() {
    const payload = {
      valorInicial: this.valorInicial,
      aporteMensal: this.aporteMensal,
      taxaJuros: this.taxaJuros,
      tempo: this.tempo,
      periodicidade: 'mensal'
    };

    this.http.post<any[]>('http://localhost:8080/calcular', payload).subscribe(data => {
      this.resultados = data;
    });
  }
}
