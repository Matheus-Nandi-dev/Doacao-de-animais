import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(window:resize)': 'onResize($event)'
  }
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  onEscape(): void { this.menuOpen = false; }

  onResize(event: UIEvent): void {
    if ((event.target as Window).innerWidth >= 768) this.menuOpen = false;
  }
}