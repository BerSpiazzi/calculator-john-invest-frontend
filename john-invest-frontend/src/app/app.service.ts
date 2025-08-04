import {computed, inject, Injectable} from '@angular/core';
import {enviroment} from '../enviroments/enviroment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  restApi = computed(() => `${enviroment.API_URL}`);
  private readonly http = inject(HttpClient);

  calculate(payload: any) {
    return this.http.post<any[]>(`${this.restApi}/calcular`, payload);
  }
}
