import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Animal, AnimalService } from '../services/animal';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  animais: Animal[] = [];

  private readonly animalService = inject(AnimalService);

  ngOnInit(): void {
    this.animalService.getAnimais().subscribe((data) => {
      this.animais = data;
    });
  }
}