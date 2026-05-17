
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ItemList } from './item-list/item-list';
import { ItemDetalhe } from './components/item-detalhe/item-detalhe';
import { Adotar } from './components/adotar/adotar';
import { SobreComponent } from './components/sobre/sobre';
import { DoacaoComponent } from './components/doacao/doacao';
import { AdminComponent } from './components/admin/admin';
import { AdminDashboardComponent } from './components/admin/dashboard/dashboard';
import { DoadoresComponent } from './components/admin/doadores/doadores';
import { AdotantesComponent } from './components/admin/adotantes/adotantes';
import { CidadesComponent } from './components/admin/cidades/cidades';
import { AdocoesComponent } from './components/admin/adocoes/adocoes';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'inicio',   redirectTo: '', pathMatch: 'full' },
  { path: 'listagem', component: ItemList },
  { path: 'sobre',    component: SobreComponent },
  { path: 'doacao',   component: DoacaoComponent },
  { path: 'item/:id', component: ItemDetalhe },
  { path: 'adotar/:id', component: Adotar },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'doadores', component: DoadoresComponent },
      { path: 'adotantes', component: AdotantesComponent },
      { path: 'cidades', component: CidadesComponent },
      { path: 'adocoes', component: AdocoesComponent }
    ]
  },
  { path: '**',       redirectTo: '' }
];
