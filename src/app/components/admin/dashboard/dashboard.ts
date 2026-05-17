import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  stats = [
    { label: 'Total de Animais', valor: '24', icone: '🐾' },
    { label: 'Total de Doadores', valor: '12', icone: '👥' },
    { label: 'Total de Adotantes', valor: '8', icone: '💕' },
    { label: 'Adoções Realizadas', valor: '5', icone: '✓' }
  ];
}
