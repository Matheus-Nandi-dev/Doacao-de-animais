import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cidade {
  id?: string;
  nome: string;
  estado: string;
  populacao: number;
}

@Component({
  selector: 'app-cidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CidadesComponent {
  cidades: Cidade[] = [
    { id: '1', nome: 'Toledo', estado: 'PR', populacao: 130000 },
    { id: '2', nome: 'Curitiba', estado: 'PR', populacao: 1900000 },
    { id: '3', nome: 'Cascavel', estado: 'PR', populacao: 330000 }
  ];

  novaCidade: Cidade = { nome: '', estado: '', populacao: 0 };
  editando: string | null = null;
  formularioVisivel = false;

  abrirFormulario() {
    this.formularioVisivel = true;
    this.novaCidade = { nome: '', estado: '', populacao: 0 };
    this.editando = null;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editando = null;
  }

  adicionarCidade() {
    if (this.novaCidade.nome && this.novaCidade.estado) {
      if (this.editando) {
        const idx = this.cidades.findIndex(c => c.id === this.editando);
        if (idx !== -1) {
          this.cidades[idx] = { ...this.novaCidade, id: this.editando };
        }
      } else {
        this.cidades.push({ ...this.novaCidade, id: Date.now().toString() });
      }
      this.fecharFormulario();
    }
  }

  editarCidade(cidade: Cidade) {
    this.novaCidade = { ...cidade };
    this.editando = cidade.id || null;
    this.formularioVisivel = true;
  }

  deletarCidade(id: string | undefined) {
    if (id) {
      this.cidades = this.cidades.filter(c => c.id !== id);
    }
  }
}
