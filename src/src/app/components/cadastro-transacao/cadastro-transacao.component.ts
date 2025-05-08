import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../models/transacao.model';
import { CommonModule } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-cadastro-transacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-transacao.component.html',
  styleUrls: ['./cadastro-transacao.component.css']
})
export class CadastroTransacaoComponent implements OnInit {
  transacao: Transacao = new Transacao(0, '', '', '', '', 'entrada', 0);
  transacoes: Transacao[] = [];
  proximoId: number = 1;
  total: number = 0;
  transacoesTotal: Transacao[] = []

  ngOnInit() {
    this.listarTransacoes(); // Carregar as transações ao inicializar o componente
  }

  // Função para listar as transações
  listarTransacoes() {
    const storedTransacoes = localStorage.getItem('transacoes');
    if (storedTransacoes) {
      this.transacoes = JSON.parse(storedTransacoes);
      this.proximoId = this.transacoes.length > 0 ? Math.max(...this.transacoes.map(t => t.id)) + 1 : 1;
    }
    this.calcularTotal();
  }
  calcularTotal(): void {
    this.total = this.transacoes.reduce((acc, t) => acc + t.valor, 0);
  }






  // Função para salvar a transação
  salvar() {
if (!this.transacao.nome || !this.transacao.cpf || !this.transacao.data || !this.transacao.local || this.transacao.valor <= 0) {
  alert('Preencha todos os campos corretamente.');
  return;
}

this.transacao.id = this.proximoId++;
this.transacoes.push({ ...this.transacao });

// Salvar as transações no localStorage
localStorage.setItem('transacoes', JSON.stringify(this.transacoes));

// Resetar o formulário após salvar
this.transacao = new Transacao(0, '', '', '', '', 'entrada', 0);
this.calcularTotal();
  }
}
