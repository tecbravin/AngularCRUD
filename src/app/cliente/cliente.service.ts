import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteModel } from './cliente.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  salvar(cliente: ClienteModel): Observable<any> {
    const clienteClone = Object.assign({}, cliente);

    clienteClone.id = Guid.newGuid()
    clienteClone.nascimento = moment(cliente.nascimento).format('DD/MM/YYYY');
    clienteClone.cadastro = moment().format('DD/MM/YYYY LTS');

    return this.http.post(`${environment.clienteApi}`, clienteClone);
  }

  filtrar(cliente: ClienteModel, page: number): Observable<any> {

    let params = new HttpParams();

    params = params.append("_page", page);
    params = params.append("_limit", 4);

    if(cliente.nome) params = params.append("nome", cliente.nome);
    if(cliente.cpf) params = params.append("cpf", cliente.cpf);
    if(cliente.nascimento) params = params.append("nascimento", moment(cliente.nascimento).format('DD/MM/YYYY'));

    return this.http.get(`${environment.clienteApi}`, {
      params: params,
      observe: 'response'
    });
  }

  excluir(clienteId: string) {
    return this.http.delete(`${environment.clienteApi}/${clienteId}`)
  }

  obter(clienteId: string): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${environment.clienteApi}/${clienteId}`);
  }

  atualizar(cliente: ClienteModel, clienteId: string ): Observable<any> {
    const novoCliente = Object.assign({}, cliente);
    moment.locale('pt-br');
    novoCliente.id = Guid.newGuid()
    novoCliente.nascimento = moment(cliente.nascimento).format('DD/MM/YYYY');
    novoCliente.cadastro = moment().format('DD/MM/YYYY');

    return this.http.put(`${environment.clienteApi}/${clienteId}`, novoCliente);
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
