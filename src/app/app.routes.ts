
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ItemList } from './item-list/item-list';
import { ItemDetalhe } from './components/item-detalhe/item-detalhe';
import { Adotar } from './components/adotar/adotar';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'inicio',   redirectTo: '', pathMatch: 'full' },
  { path: 'listagem', component: ItemList },
  { path: 'item/:id', component: ItemDetalhe },
  { path: 'adotar/:id', component: Adotar }, // ← adiciona
  { path: '**',       redirectTo: '' }
];