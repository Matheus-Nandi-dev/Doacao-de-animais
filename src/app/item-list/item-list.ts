import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of, timeout } from 'rxjs';
import { Animal, AnimalService } from '../services/animal';

export interface AnimalData {
  id: string;
  nome: string;
  especie: string;
  idade: string;
  cidade: string;
  genero: string;
  imagem?: string;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  todosAnimais: AnimalData[] = [];
  animaisFiltrados: AnimalData[] = [];
  imagensComErro = new Set<string>();
  private readonly ajusteEnquadramentoPorId: Record<string, string> = {
    // Thor e Max voltam ao enquadramento padrão.
    '5a22eb32-cedd-4d98-896b-e7422032234b': '50% 50%',
    'f2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d': '50% 50%',
    // Roberto um pouco mais para baixo.
    '6a2efe75-357b-437a-a890-0af5247cb929': '50% 34%'
  };
  loading = true;
  erro = false;
  modalAberto = false;
  animalSelecionadoNome = '';

  // Filtros
  busca = '';
  filtroEspecie = '';
  filtroGenero = '';

  // Modal
  modalNome = '';
  modalWhatsapp = '';
  modalEmail = '';

  private readonly animalService = inject(AnimalService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  readonly EMOJI_ESPECIE: Record<string, string> = {
    cachorro: '🐶', gato: '🐱', coelho: '🐰',
    hamster: '🐹', passaro: '🐦'
  };

  ngOnInit(): void {
    this.animalService.getAnimais().pipe(
      timeout(8000),
      catchError(() => {
        this.erro = true;
        return of([] as Animal[]);
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (data: Animal[]) => {
        const lista = Array.isArray(data) ? data : [];
        if (!Array.isArray(data)) {
          this.erro = true;
        }

        const animais = lista.map((animal) => ({
          id: animal.id,
          nome: animal.nome,
          especie: animal.especie ?? animal.raca ?? '',
          idade: String(animal.idade),
          cidade: animal.cidade ?? '',
          genero: animal.genero,
          imagem: animal.imagem ?? ''
        }));

        this.todosAnimais = animais;
        this.animaisFiltrados = animais;
        this.cdr.detectChanges();
      }
    });
  }

  private normalizarTexto(valor: string): string {
    return (valor ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  emojiEspecie(especie: string): string {
    if (!especie) return '🐾';
    const key = especie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const k in this.EMOJI_ESPECIE) {
      if (key.includes(k)) return this.EMOJI_ESPECIE[k];
    }
    return '🐾';
  }

  deveMostrarImagem(animal: AnimalData): boolean {
    return Boolean(animal.imagem) && !this.imagensComErro.has(animal.id);
  }

  tratarErroImagem(id: string): void {
    this.imagensComErro.add(id);
    this.cdr.detectChanges();
  }

  obterPosicaoImagem(id: string): string {
    return this.ajusteEnquadramentoPorId[id] ?? '50% 24%';
  }

  isFemea(genero: string): boolean {
    return this.normalizarTexto(genero).includes('fem');
  }

  filtrarAnimais(): void {
    const busca = this.normalizarTexto(this.busca);
    const especie = this.normalizarTexto(this.filtroEspecie);
    const genero = this.normalizarTexto(this.filtroGenero);

    this.animaisFiltrados = this.todosAnimais.filter(a => {
      const nome = this.normalizarTexto(a.nome);
      const especieAnimal = this.normalizarTexto(a.especie);
      const generoAnimal = this.normalizarTexto(a.genero);

      const matchBusca = !busca ||
        nome.includes(busca) ||
        especieAnimal.includes(busca);
      const matchEspecie = !especie || especieAnimal.includes(especie);
      const matchGenero = !genero || generoAnimal.includes(genero);
      return matchBusca && matchEspecie && matchGenero;
    });
  }

  abrirModal(nome: string): void {
    this.animalSelecionadoNome = nome;
    this.modalAberto = true;
    this.modalNome = '';
    this.modalWhatsapp = '';
    this.modalEmail = '';
  }

  abrirDetalhe(id: string): void {
    this.router.navigate(['/item', id]);
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  confirmarAdocao(): void {
    if (!this.modalNome || !this.modalWhatsapp || !this.modalEmail) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    alert(`✅ Solicitação enviada!\nEntraremos em contato em breve, ${this.modalNome}!`);
    this.fecharModal();
  }
}