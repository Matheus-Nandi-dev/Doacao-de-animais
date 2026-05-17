import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Doador {
  id?: string;
  nome: string;
  especie: string;
  descricao: string;
  idade: number;
  cidade: string;
}

@Component({
  selector: 'app-doadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doadores.html',
  styleUrl: './doadores.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoadoresComponent {
  doadores: Doador[] = [
    { id: '1', nome: 'Rex', especie: 'Cachorro', descricao: 'Cachorro dócil', idade: 5, cidade: 'Toledo' },
    { id: '2', nome: 'Luna', especie: 'Gato', descricao: 'Gata carinhosa', idade: 3, cidade: 'Curitiba' }
  ];

  novoDoador: Doador = { nome: '', especie: '', descricao: '', idade: 0, cidade: '' };
  editando: string | null = null;
  formularioVisivel = false;

  abrirFormulario() {
    this.formularioVisivel = true;
    this.novoDoador = { nome: '', especie: '', descricao: '', idade: 0, cidade: '' };
    this.editando = null;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editando = null;
  }

  adicionarDoador() {
    if (this.novoDoador.nome && this.novoDoador.especie && this.novoDoador.cidade) {
      if (this.editando) {
        const idx = this.doadores.findIndex(d => d.id === this.editando);
        if (idx !== -1) {
          this.doadores[idx] = { ...this.novoDoador, id: this.editando };
        }
      } else {
        this.doadores.push({ ...this.novoDoador, id: Date.now().toString() });
      }
      this.fecharFormulario();
    }
  }

  editarDoador(doador: Doador) {
    this.novoDoador = { ...doador };
    this.editando = doador.id || null;
    this.formularioVisivel = true;
  }

  deletarDoador(id: string | undefined) {
    if (id) {
      this.doadores = this.doadores.filter(d => d.id !== id);
    }
  }
}
