import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SortDirective } from '../directive/sort.directive';
import { NgxPaginationModule } from 'ngx-pagination';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    ClienteListaComponent,
    ClienteCadastroComponent,    
    SortDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClienteRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ]
})
export class ClienteModule { }
