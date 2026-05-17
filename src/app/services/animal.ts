import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Animal {
  id: string;
  nome: string;
  genero: string;
  idade: string | number;
  especie?: string;
  raca?: string;
  cidade?: string;
  descricao?: string;
  imagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private readonly apiUrl = `${environment.apiUrl}/animais`;
  private readonly http = inject(HttpClient);

  getAnimais(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }
}