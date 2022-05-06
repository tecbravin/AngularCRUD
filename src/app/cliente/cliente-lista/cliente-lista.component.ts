import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit  {

  constructor(private clienteService: ClienteService,
    private router: Router) { }

  filtro: ClienteModel = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    cadastro: '',
    nascimento: '',
    rendaMensal: ''
  };

  page: number = 1;

  lista: ClienteModel[] = [];

  total = 0;

  ngOnInit(): void {
    this.filtrar();
  }

  filtrar(page: number = 1) {
    this.lista = []
    this.clienteService.filtrar(this.filtro, page).subscribe(ret => {
      if(ret.body.length) {
        this.lista = ret.body;        
        this.total = ret.headers.get('X-Total-Count');
        this.page = page;
        
        setTimeout(() => {
          feather.replace();
        })

      } else {
        Swal.fire({
          title: 'Ooops!',
          text: 'Não foi encontrado nenhum registro',
          icon: 'warning'
        })
      }
    });
  }

  getPage(page: any) {
    this.filtrar(page)
  }

  excluir(cliente: ClienteModel) {
    Swal.fire({
      title: 'Deseja excluir',
      text: `${cliente.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.excluir(cliente.id).subscribe(() => {
          this.filtrar();
          Swal.fire(
            'Cliente excluido',
            'Cliente excluído com sucesso.',
            'success'
          )
        })        
      }
    })
  }

  editar(clienteId: string) {
    
    this.router.navigateByUrl(`/cliente/editar/${clienteId}`);
  }

}