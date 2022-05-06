import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html'
})
export class ClienteCadastroComponent implements OnInit {

  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  cliente: ClienteModel = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    cadastro: '',
    nascimento: '',
    rendaMensal: ''
  };

  clienteId: string = '';

  desabilitarCpf = false;

  ngOnInit(): void {    
    moment.locale('pt-br');
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.clienteId = id;
      this.desabilitarCpf = true
      this.clienteService.obter(this.clienteId).subscribe(ret => {        
        this.cliente = ret;
        this.cliente.nascimento = moment(this.cliente.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
      })
    }
    
  }

  salvar() {    

    if(this.clienteId)  {
      this.clienteService.atualizar(this.cliente, this.clienteId).subscribe({
        next: () => {
          
          Swal.fire({
            title: 'Sucesso!',
            text: 'O Cliente foi atualizado',
            icon: 'success'
          })
  
          this.router.navigateByUrl("/cliente/lista")
        },
        error: () => {
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro',
            icon: 'error'
          })
        }
      });
    } else {
      this.clienteService.salvar(this.cliente).subscribe({
        next: () => {
          
          Swal.fire({
            title: 'Sucesso!',
            text: 'O Cliente foi cadastrado',
            icon: 'success'
          })
  
          this.router.navigateByUrl("/cliente/lista")
        },
        error: () => {
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro',
            icon: 'error'
          })
        }
      });    
    }
  }

  validarIdade() {
    const idade18Anos = moment().add(-18, 'years')
    const idade60Anos = moment().add(-60, 'years')
    const idadeAtual = moment(this.cliente.nascimento);

    return idadeAtual > idade60Anos && idadeAtual < idade18Anos
  }

  isValidCPF() {
    let cpf = this.cliente.cpf

    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 
    ) {
        return false
    }
    var soma = 0
    var resto = 0
    
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if (resto == 10)  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if (resto == 10)  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
  }

  validarSobrenome() {
    return this.cliente.nome.match(/\w+\s+\w/)
  }
}
