import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Animal, AnimalService } from '../../services/animal';

@Component({
  selector: 'app-item-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detalhe.html',
  styleUrl: './item-detalhe.css'
})
export class ItemDetalhe implements OnInit {
  animal: Animal | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly animalService = inject(AnimalService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.animalService.getAnimalById(Number(id)).subscribe((data) => {
      this.animal = data;
    });
  }
}