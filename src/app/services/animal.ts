import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://127.0.0.1:5000/animais';

  private http = inject(HttpClient);

  getAnimais(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }
}