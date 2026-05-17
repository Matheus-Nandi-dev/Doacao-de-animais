import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Adotante {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  dataAdocao?: string;
}

@Component({
  selector: 'app-adotantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adotantes.html',
  styleUrl: './adotantes.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdotantesComponent {
  adotantes: Adotante[] = [
    { id: '1', nome: 'João Silva', email: 'joao@email.com', telefone: '(45) 98765-4321', cidade: 'Toledo', dataAdocao: '2024-01-15' },
    { id: '2', nome: 'Maria Santos', email: 'maria@email.com', telefone: '(45) 99876-5432', cidade: 'Cascavel', dataAdocao: '2024-02-20' }
  ];

  novoAdotante: Adotante = { nome: '', email: '', telefone: '', cidade: '', dataAdocao: '' };
  editando: string | null = null;
  formularioVisivel = false;

  abrirFormulario() {
    this.formularioVisivel = true;
    this.novoAdotante = { nome: '', email: '', telefone: '', cidade: '', dataAdocao: '' };
    this.editando = null;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editando = null;
  }

  adicionarAdotante() {
    if (this.novoAdotante.nome && this.novoAdotante.email && this.novoAdotante.cidade) {
      if (this.editando) {
        const idx = this.adotantes.findIndex(a => a.id === this.editando);
        if (idx !== -1) {
          this.adotantes[idx] = { ...this.novoAdotante, id: this.editando };
        }
      } else {
        this.adotantes.push({ ...this.novoAdotante, id: Date.now().toString() });
      }
      this.fecharFormulario();
    }
  }

  editarAdotante(adotante: Adotante) {
    this.novoAdotante = { ...adotante };
    this.editando = adotante.id || null;
    this.formularioVisivel = true;
  }

  deletarAdotante(id: string | undefined) {
    if (id) {
      this.adotantes = this.adotantes.filter(a => a.id !== id);
    }
  }
}
