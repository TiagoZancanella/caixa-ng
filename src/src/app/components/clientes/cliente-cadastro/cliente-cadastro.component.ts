import { Component, EventEmitter, Output, Input } from '@angular/core'; // Importa decoradores e classes para comunicação entre componentes
import { FormsModule } from '@angular/forms'; // Importa o FormsModule para usar ngModel
import { Cliente } from '../../../models/cliente'; // Importa a classe Cliente

@Component({
  selector: 'app-cliente-cadastro', // Define o seletor para usar este componente em outros templates
  imports: [FormsModule], // Habilita o uso de formulários reativos com ngModel
  templateUrl: './cliente-cadastro.component.html', // Caminho do template HTML do componente
  styleUrl: './cliente-cadastro.component.css' // Caminho para o CSS (possível erro: o correto seria 'styleUrls' no plural)
})
export class ClienteCadastroComponent {

  // Evento de saída que permite ao componente filho (ClienteCadastroComponent)
  // Enviar uma string para o componente pai (ClienteComponent)
  @Output() salvarEvento = new EventEmitter<void>(); // Evento que será emitido ao salvar

  // O componente pai vai passar o objeto do cliente de acordo com o modo:
  // modo de cadastro: os campos do cliente estarão vazios
  // modo de edição: os campos do cliente estarão preenchidos
  @Input() cliente?: Cliente; // Cliente vindo do componente pai

  salvar(){ // Função chamada ao clicar em "salvar"
    
  if (this.isFormValid() == false)
    return;
    this.salvarEvento.emit(); // Dispara o evento para o componente pai executar a lógica de salvar
  // this.salvarEvento.emit()
}
private isFormValid(){
  if (this.cliente?.nome.trim()== ""){
    alert("nome deve ser preenchido")
  return false;
  }
  
  if (this.cliente?.nome.trim().length! < 3){
    alert("nome deve conter 3 caracteres")
    return false;
  }
  if (this.cliente?.cpf.trim() == ""){
    alert("cpf deve ser preenchido")
    return false;
  }
  
  const regexCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/


  if (regexCpf.test(this.cliente?.cpf!)== false){
    alert("CPF deve ser preenchido no formato 000.000.000-00")
    return false;
  }
return true;
}

}
