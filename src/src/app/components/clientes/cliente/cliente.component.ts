import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { ClienteCadastroComponent } from "../cliente-cadastro/cliente-cadastro.component"; // Importa o componente de cadastro de cliente
import { Cliente } from '../../../models/cliente'; // Importa a classe Cliente do modelo
import { JsonpClientBackend } from '@angular/common/http'; // Importa do Angular HTTP (não utilizado no código atual)
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente', // Define o seletor do componente
  imports: [ClienteCadastroComponent, FormsModule], // Importa o componente de cadastro para uso neste componente
  templateUrl: './cliente.component.html', // Caminho do template HTML
  styleUrl: './cliente.component.css' // Caminho do arquivo CSS (possível erro: o correto seria 'styleUrls' no plural)
})
export class ClienteComponent {

  // clientes: Array<Cliente> = [] // Lista de clientes cadastrados
  idAtual: number = 0; // Armazena o último ID utilizado
  busca: string = "";


  clientes: Array<Cliente> = new Array();
  clientesTable: Array<Cliente> = new Array();
  // será o cliente que utilizaremos para preencher os campos na tela e posteriormente salvar 
  cliente: Cliente; // Objeto cliente usado no formulário
  constructor(){
    this.cliente = new Cliente(); // Inicializa um novo cliente
  }

  ngOnInit() { // Lifecycle hook que é chamado ao iniciar o componente
    this.carregarClientesDoLocalStorage(); // Carrega os clientes salvos no localStorage
  }

  registrarClienteSalvo() { // Decide se vai cadastrar ou editar com base no ID do cliente
    if(this.cliente.id===0)
      this.cadastrar(); // Se for novo (ID 0), cadastra
    else
      this.editar(); // Se já existir (ID diferente de 0), edita
  
    this.cliente = new Cliente(); // Reseta o objeto cliente
    this.salvarEmLocalStorage(); // Salva a lista atualizada no localStorage
    this.listarClientesFiltrando();
  }

private editar(){ // Atualiza os dados do cliente existente na lista
  let indiceCliente = this.clientes.findIndex(x => x.id == this.cliente.id);
  this.clientes[indiceCliente].nome = this.cliente.nome;
  this.clientes[indiceCliente].cpf = this.cliente.cpf;
}
listarClientesFiltrando(){
  if(!this.busca)
    this.clientesTable = this.clientes;

  this.clientesTable = this.clientes
    .filter(cliente => cliente.nome.toLowerCase().includes(this.busca.toLowerCase()) || this.cliente.cpf == this.busca);
}
private cadastrar() { // Cadastra um novo cliente na lista
  this.idAtual++; // Incrementa o ID atual
  this.cliente.id = this.idAtual; // Define o ID no cliente atual
  this.clientes.push(this.cliente); // Adiciona à lista
}

salvarEmLocalStorage() { 
  // this.clientes é uma lista de objetos da classe Cliente
  // JSON.stringify converte a lista para uma string JSON
  const clientesString = JSON.stringify(this.clientes);
  localStorage.setItem("clientes", clientesString); // Salva no localStorage
}

carregarClientesDoLocalStorage() {
  // Obtém a lista de clientes do localStorage com a chave "clientes"
  const clientesString = localStorage.getItem("clientes");
  
  // Verifica se existe conteúdo; se não, encerra a função
  if (clientesString === null)
    return;

  // Converte a string JSON de volta para a lista de objetos
  this.clientes = JSON.parse(clientesString);
  this.listarClientesFiltrando();
  // Atualiza o idAtual com base no maior ID existente
  Array.from(this.clientes).forEach(cliente => {
    if (cliente.id > this.idAtual) {
      this.idAtual = cliente.id;
    }
  });
}

apagar(cliente: Cliente) { // Apaga um cliente da lista
  let confirmacao = confirm(`Deseja realemente apagar o cliente'${cliente.nome}`); // Confirmação do usuário
  if (confirmacao !== true)
    return;

  let indiceCliente = this.clientes.findIndex(x => x.id == cliente.id); // Localiza o índice do cliente
  this.clientes.splice(indiceCliente, 1); // Remove da lista

  this.salvarEmLocalStorage(); // Atualiza o localStorage
  this.listarClientesFiltrando();
}

preencherCamposParaEditar(cliente: Cliente){ // Preenche os campos do formulário com os dados do cliente a ser editado
  this.cliente = new Cliente(); // Cria um novo objeto Cliente
  this.cliente.id = cliente.id; // Copia o ID
  this.cliente.nome = cliente.nome; // Copia o nome
  this.cliente.cpf = cliente.cpf; // Copia o cpf
}
}
