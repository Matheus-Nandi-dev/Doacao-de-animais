import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Adocao {
  id: string;
  animal: string;
  adotante: string;
  data: string;
  status: 'pendente' | 'concluida' | 'cancelada';
}

@Component({
  selector: 'app-adocoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adocoes.html',
  styleUrl: './adocoes.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdocoesComponent {
  adocoes: Adocao[] = [
    { id: '1', animal: 'Rex', adotante: 'João Silva', data: '2024-01-15', status: 'concluida' },
    { id: '2', animal: 'Luna', adotante: 'Maria Santos', data: '2024-02-20', status: 'concluida' },
    { id: '3', animal: 'Milu', adotante: 'Pedro Costa', data: '2024-03-10', status: 'pendente' }
  ];

  filtroStatus: 'todos' | 'concluida' | 'pendente' | 'cancelada' = 'todos';

  get adocoesFiltradas() {
    if (this.filtroStatus === 'todos') {
      return this.adocoes;
    }
    return this.adocoes.filter(a => a.status === this.filtroStatus);
  }

  setFiltroStatus(status: string): void {
    if (status === 'todos' || status === 'concluida' || status === 'pendente' || status === 'cancelada') {
      this.filtroStatus = status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'concluida':
        return 'status-concluida';
      case 'pendente':
        return 'status-pendente';
      case 'cancelada':
        return 'status-cancelada';
      default:
        return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'concluida':
        return '✓ Concluída';
      case 'pendente':
        return '⏳ Pendente';
      case 'cancelada':
        return '✕ Cancelada';
      default:
        return status;
    }
  }
}
