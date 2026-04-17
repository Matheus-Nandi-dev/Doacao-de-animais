import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class SobreComponent {}
