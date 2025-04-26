import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-receita',
  imports: [FormsModule],
  templateUrl: './cadastro-receita.component.html',
  styleUrl: './cadastro-receita.component.css'
})
export class CadastroReceitaComponent {
// toda vez que utilizar [(ngModel)] é obrigatório importar o FormsModule
// ngModel é a forma que fazemos a ligação de algum campo com uma variável
 nome: string = "";
 valor: number= 0;
receitas: Array<string> = [];


salvarReceita(){
  debugger;
// como adicionar um elemento em uma lista de string em ts
  this.receitas.push(this.nome)
  alert(this.nome);
 }
}
