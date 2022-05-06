import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './cliente/cliente-lista/cliente-lista.component';

const routes: Routes = [
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente-routing.module').then(m => m.ClienteRoutingModule)
  },
  { path: '**', component: ClienteListaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
