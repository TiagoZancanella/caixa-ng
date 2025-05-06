import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { FormsModule } from '@angular/forms'; // Importa o módulo de formulários para uso de ngModel
import { Produto } from '../../../models/produto'; // Importa a classe Produto do diretório de modelos

@Component({
  selector: 'app-cadastro-produto', // Define o seletor para usar este componente no HTML
  imports: [FormsModule], // Importa o FormsModule para uso interno no componente
  templateUrl:'./cadastro-produto.component.html', // Caminho para o template HTML do componente
  styleUrl: './cadastro-produto.component.css' // Caminho para o arquivo CSS do componente (possível erro: o correto seria 'styleUrls' no plural)
})
export class CadastroProdutoComponent { // Declaração da classe do componente

proximoId: number= 0; // Armazena o próximo ID a ser usado ao cadastrar novo produto
nome: string = ""; // Variável não utilizada no código atual
produtos: Array<Produto> = []; // Lista de produtos cadastrados
produto: string = ''; // Nome do produto atual em edição ou cadastro
idParaEditar?: number; // Armazena o ID do produto que está sendo editado, se houver

salvarProduto() { // Método para salvar (cadastrar ou atualizar) um produto
  const nomeLimpo = this.produto.trim(); // Remove espaços em branco do início e fim

  if (nomeLimpo.length < 3) { // Validação: nome com menos de 3 caracteres
    alert("Nome deve conter no mínimo 3 caracteres");
    return;
  }

  if (nomeLimpo.length > 30) { // Validação: nome com mais de 30 caracteres
    alert("Nome deve conter no máximo 30 caracteres");
    return;
  }
  this.proximoId++; // Incrementa o ID para o próximo produto

  if (this.idParaEditar) { // Se houver ID para edição, atualiza o produto existente
    const produtoExistente = this.produtos.find(p => p.id === this.idParaEditar);
    if (produtoExistente) {
      produtoExistente.nome = nomeLimpo; // Atualiza o nome do produto
      alert('Produto atualizado!');
    }
  } else {
    // Se não estiver editando, cria um novo produto
    const novoProduto = new Produto(this.proximoId, nomeLimpo);
    this.produtos.push(novoProduto); // Adiciona à lista de produtos
    // alert(`Produto cadastrado: ${nomeLimpo}`);
    this.produto = ''; // Limpa o campo de entrada
  }
}

editarProduto(){ // Método que finaliza a edição e atualiza o nome do produto
  let indiceProduto = this.produtos.findIndex(x => x.id == this.idParaEditar);
  this.produtos[indiceProduto].nome = this.produto.trim();
  this.idParaEditar = undefined; // Reseta o ID de edição
  this.produto = ''; // Limpa o campo de entrada
}

apagarProduto(produto: Produto){ // Método que apaga um produto da lista
  let confirmacao = confirm(`Deseja realmente apagar a receita '${produto.nome}'?`)
  if(confirmacao == false)
    return;

  let indiceProduto = this.produtos.findIndex(x => x.id == produto.id);
  this.produtos.splice(indiceProduto, 1); // Remove o produto da lista
}

editar(produto: Produto){ // Método que inicia a edição de um produto
  this.produto = produto.nome; // Preenche o campo com o nome atual
  this.idParaEditar = produto.id; // Armazena o ID para saber que está em modo edição
}
}
