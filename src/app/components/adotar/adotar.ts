import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';
import { AnimalService } from '../../services/animal';

@Component({
  selector: 'app-adotar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adotar.html',
  styleUrl: './adotar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adotar implements OnInit {
  loading = true;
  erro = false;

  animalSelecionadoNome = '';

  modalNome = '';
  modalWhatsapp = '';
  modalEmail = '';

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
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
    ).subscribe((animal) => {
      if (!animal) {
        this.erro = true;
        this.cdr.detectChanges();
        return;
      }

      this.animalSelecionadoNome = animal.nome;
      this.cdr.detectChanges();
    });
  }

  fecharModal(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigate(['/listagem']);
  }

  confirmarAdocao(): void {
    if (!this.modalNome || !this.modalWhatsapp || !this.modalEmail) {
      // TODO: Replace with proper toast notification
      console.warn('Por favor, preencha todos os campos!');
      return;
    }

    // TODO: Send adoption request to backend
    console.log(`Solicitação enviada! Entraremos em contato em breve, ${this.modalNome}!`);
    this.fecharModal();
  }
}
