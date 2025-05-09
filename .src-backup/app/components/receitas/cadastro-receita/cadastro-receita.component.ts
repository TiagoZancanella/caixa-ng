import { Component, numberAttribute } from '@angular/core'; // Importa o decorador Component e (desnecessariamente) numberAttribute
import { FormsModule } from '@angular/forms'; // Importa FormsModule para permitir uso de ngModel
import { Receita } from '../../../models/receita'; // Importa a classe Receita

@Component({
  selector: 'app-cadastro-receita', // Define o seletor HTML para o componente
  imports: [FormsModule], // Habilita a utilização do FormsModule (necessário para ngModel)
  templateUrl: './cadastro-receita.component.html', // Caminho para o template HTML
  styleUrl: './cadastro-receita.component.css' // Caminho para o arquivo de estilo (possível erro: o correto seria 'styleUrls')
})
export class CadastroReceitaComponent {
  // Toda vez que utilizar [(ngModel)] é obrigatório importar o FormsModule
  // ngModel é a forma que fazemos a ligação de algum campo com uma variável

  proximoId: number = 0; // Controla o ID incremental para novas receitas

  // idParaEditar é uma variável do tipo number que pode ser undefined (nullable)
  idParaEditar?: number;

  nome: string = ""; // Nome da receita
  valor: number = 0; // Valor da receita
  receitas: Array<Receita> = []; // Lista de receitas cadastradas

  salvarReceita() {
    // Validação: nome muito curto
    if(this.nome.length < 3){
      alert("Nome deve conter no mínimo 3 caracteres")
      return;
    }

    // Validação: nome muito longo
    if(this.nome.length > 30){
      alert("Nome deve conterno máximo 100 caracteres") // Observação: a mensagem menciona 100, mas o código valida 30
      return;
    }

    // Converte valor para número, tratando vírgula como ponto
    let valor = parseFloat(this.valor.toString().replace("," , "."));
    
    // Verifica se o valor é um número real
    if (Number.isNaN(valor)){
      alert("Valor dever ser um número real");
      return;
    }

    // Verifica se o valor é positivo
    if (valor <= 0){
      alert("Valor deve ser maior que R$ 0,00")
      return;
    }

    // Decide se vai cadastrar ou editar com base na presença de idParaEditar
    if(this.idParaEditar == undefined){
      this.CadastrarReceita();
    } else {
      this.editarReceita();
    }

    // Reseta os campos após salvar
    this.nome = "";  
    this.valor = 0;
  }

  editarReceita() {
    // Localiza a receita a ser editada
    let indiceReceita = this.receitas.findIndex(x => x.id == this.idParaEditar);
    
    // Atualiza os valores da receita
    this.receitas[indiceReceita].nome = this.nome;
    this.receitas[indiceReceita].valor = this.valor;

    // Reseta o ID para edição
    this.idParaEditar = undefined;
  }

  CadastrarReceita() {
    // Cria nova receita com ID incremental
    let receita = new Receita(++this.proximoId, this.nome, this.valor);

    // Adiciona a nova receita à lista
    this.receitas.push(receita);
  }

  apagar(receita: Receita) {
    // Confirmação do usuário para apagar a receita
    let confirmacao = confirm(`Deseja realmente apagar a receita '${receita.nome}'?`)
    if(confirmacao == false)
      return;

    // Encontra e remove a receita da lista
    let indiceReceita = this.receitas.findIndex(x => x.id == receita.id);
    this.receitas.splice(indiceReceita, 1);
  }

  editar(receita: Receita) {
    // Preenche os campos com os dados da receita para edição
    this.nome = receita.nome;
    this.valor = receita.valor;
    this.idParaEditar = receita.id;
  }
}
