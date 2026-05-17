import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';
import { Animal, AnimalService } from '../../services/animal';

@Component({
  selector: 'app-item-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detalhe.html',
  styleUrl: './item-detalhe.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetalhe implements OnInit {
  animal: Animal | null = null;
  loading = true;
  erro = false;
  imagemComErro = false;
  private readonly ajusteEnquadramentoPorId: Record<string, string> = {
    // Thor e Max voltam ao enquadramento padrão.
    '5a22eb32-cedd-4d98-896b-e7422032234b': '50% 50%',
    'f2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d': '50% 50%',
    // Roberto um pouco mais para baixo.
    '6a2efe75-357b-437a-a890-0af5247cb929': '50% 34%'
  };

  private readonly route = inject(ActivatedRoute);
  private readonly animalService = inject(AnimalService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.erro = true;
      this.cdr.detectChanges();
      return;
    }

    this.animalService.getAnimalById(id).pipe(
      timeout(8000),
      catchError(() => {
        this.erro = true;
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe((data) => {
      this.animal = data;
      if (!data) {
        this.erro = true;
      }
      this.cdr.detectChanges();
    });
  }

  tratarErroImagem(): void {
    this.imagemComErro = true;
  }

  get posicaoImagem(): string {

    const id = this.animal?.id;
    if (!id) {
      return '50% 50%';
    }

    return this.ajusteEnquadramentoPorId[id] ?? '50% 0%';
  }

  get especieExibicao(): string {
    return this.animal?.especie ?? this.animal?.raca ?? 'N/A';
  }

  get cidadeExibicao(): string {
    return this.animal?.cidade ?? 'N/A';
  }

  get descricaoTemperamento(): string {
    if (!this.animal) {
      return '';
    }

    if (this.animal.descricao && this.animal.descricao.trim()) {
      return this.animal.descricao;
    }

    const especie = (this.animal.especie ?? this.animal.raca ?? '').toLowerCase();
    const idade = Number(this.animal.idade);
    const jovem = Number.isFinite(idade) ? idade <= 2 : false;

    if (especie.includes('gato')) {
      return jovem
        ? 'Curioso e brincalhao, adora explorar a casa e interagir com pessoas.'
        : 'Carinhoso e observador, gosta de momentos tranquilos e companhia.';
    }

    if (especie.includes('cachorro')) {
      return jovem
        ? 'Energetico e sociavel, adora passeios e brincadeiras ao longo do dia.'
        : 'Leal e companheiro, com temperamento docil e protetor com a familia.';
    }

    if (especie.includes('hamster')) {
      return 'Delicado e ativo, gosta de rotina calma e enriquecimento no habitat.';
    }

    if (especie.includes('coelho')) {
      return 'Manso e sensivel, aprecia ambientes silenciosos e muito carinho.';
    }

    return 'Animal afetuoso, com bom potencial de adaptacao e convivencia em lar responsavel.';
  }
}