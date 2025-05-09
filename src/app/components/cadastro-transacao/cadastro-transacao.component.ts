import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../models/transacao.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-transacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-transacao.component.html',
  styleUrls: ['./cadastro-transacao.component.css']
})
export class CadastroTransacaoComponent implements OnInit {
  transacao: Transacao = new Transacao(0, '', '', '', '', 'entrada', 0); // Transação atual em edição
  transacoes: Transacao[] = []; // Lista de todas as transações
  proximoId: number = 1; // ID incremental para novas transações
  total: number = 0; // Total dos valores das transações
  totalSaida: number = 0; // Total dos valores das transações
  transacoesTotal: Transacao[] = []; // Lista auxiliar (se quiser usar para filtros ou totais separados)

  constructor() { }

  ngOnInit() {
    this.listarTransacoes(); // Carrega transações do localStorage ao iniciar
  }

  // Carrega as transações salvas no localStorage
  listarTransacoes() {
    const storedTransacoes = localStorage.getItem('transacoes');

    if (storedTransacoes) {
      try {
        const dados = JSON.parse(storedTransacoes);
        if (Array.isArray(dados)) {
          this.transacoes = dados;
          // Define o próximo ID como o maior ID + 1
          this.proximoId = this.transacoes.length > 0
            ? Math.max(...this.transacoes.map(t => t.id)) + 1
            : 1;
        } else {
          this.transacoes = [];
          console.error("Dados inválidos no localStorage: não é um array.");
        }
      } catch (e) {
        console.error("Erro ao fazer parse das transações:", e);
        this.transacoes = [];
      }
    } else {
      this.transacoes = [];
    }

    this.calcularTotal(); // Atualiza o total após carregar
  }

  // // Carrega as transações salvas no localStorage
  // listarTransacoes() {
  //   const storedTransacoes = localStorage.getItem('transacoes');

  //   if (storedTransacoes) {
  //     try {
  //       const dados = JSON.parse(storedTransacoes);
  //       if (Array.isArray(dados)) {
  //         this.transacoes = dados;
  //         // Define o próximo ID como o maior ID + 1
  //         this.proximoId = this.transacoes.length > 0
  //           ? Math.max(...this.transacoes.map(t => t.id)) + 1
  //           : 1;
  //       } else {
  //         this.transacoes = [];
  //         console.error("Dados inválidos no localStorage: não é um array.");
  //       }
  //     } catch (e) {
  //       console.error("Erro ao fazer parse das transações:", e);
  //       this.transacoes = [];
  //     }
  //   } else {
  //     this.transacoes = [];
  //   }

  //   this.calcularTotal(); // Atualiza o total após carregar
  // }

  // Calcula o total de valores das transações
  calcularTotal(): void {
    // Total de transações de entrada
    this.total = this.transacoes
      .filter(t => t.tipo === 'entrada')
      .reduce((acc, t) => acc + t.valor, 0);

    // Total de transações de saída
    this.totalSaida = this.transacoes
      .filter(t => t.tipo === 'saida')
      .reduce((acc, t) => acc + t.valor, 0);

    // Salva no localStorage
    this.salvarEmLocalStorage();
  }

  // Salva a lista de transações no localStorage
  salvarEmLocalStorage() {
    const transacaoString = JSON.stringify(this.transacoes);
    localStorage.setItem("transacoes", transacaoString); // Salva as transações corretamente
  }

  // Salva ou atualiza uma transação
  salvar() {
    // Validação dos campos obrigatórios
    if (!this.transacao.nome || !this.transacao.cpf || !this.transacao.data || !this.transacao.local || this.transacao.valor <= 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const index = this.transacoes.findIndex(t => t.id === this.transacao.id);

    if (index > -1) {
      // Edição existente
      this.transacoes[index] = { ...this.transacao };
    } else {
      // Nova transação
      this.transacao.id = this.proximoId++;
      this.transacoes.push({ ...this.transacao });
    }

    this.salvarEmLocalStorage(); // Atualiza localStorage com a lista completa
    this.calcularTotal(); // Atualiza o total

    // Limpa o formulário
    this.transacao = new Transacao(0, '', '', '', '', 'entrada', 0);
  }

  // Apaga uma transação
  apagar(transacao: Transacao) {
    const confirmacao = confirm(`Deseja realmente apagar a transação de '${transacao.nome}'?`);
    if (!confirmacao) return;

    const indice = this.transacoes.findIndex(x => x.id === transacao.id);
    if (indice > -1) {
      this.transacoes.splice(indice, 1); // Remove do array
      this.salvarEmLocalStorage(); // Atualiza localStorage
      this.calcularTotal(); // Atualiza o total
    }
  }

  // Preenche o formulário com os dados para edição
  preencherCamposParaEditar(transacao: Transacao) {
    this.transacao = new Transacao(
      transacao.id,
      transacao.nome,
      transacao.cpf,
      transacao.data,
      transacao.local,
      transacao.tipo,
      transacao.valor,
    );
  }
}
//   // Calcula o total de valores das transações
//   calcularTotal(): void {

//     if (this.transacao.tipo === 'entrada') {
//       (this.total = this.transacoes.reduce((acc, t) => acc + t.valor, 0))
//       // alert('Transação do tipo ENTRADA');
//     } else if (this.transacao.tipo === 'saida') {
//       this.totalSaida = this.transacoes
//          .filter(t => t.tipo === 'saida')
//          .reduce((acc, t) => acc + t.valor, 0)
//       alert('Transação do tipo SAÍDA');
//     } else {
//       alert('Tipo de transação desconhecido');
//     }
  
// this.salvarEmLocalStorage();
// // this.salvar();

//   }

//   // Salva a lista de transações no localStorage
//   salvarEmLocalStorage() {
//     const transacaoString = JSON.stringify(this.transacoes,);
//     localStorage.setItem("transacoes", transacaoString); //  chave padronizada
//   }

//   // Salva ou atualiza uma transação
//   salvar() {
//     // console.log(this.transacao);
//     // Validação dos campos obrigatórios
//     if (!this.transacao.nome || !this.transacao.cpf || !this.transacao.data || !this.transacao.local || this.transacao.valor <= 0) {
//       alert('Preencha todos os campos corretamente.');
//       return;
//     }

//     const index = this.transacoes.findIndex(t => t.id === this.transacao.id);

//     if (index > -1) {
//       // Edição existente
//       this.transacoes[index] = { ...this.transacao };
//     } else {
//       // Nova transação
//       this.transacao.id = this.proximoId++;
//       this.transacoes.push({ ...this.transacao });
//     }

//     this.salvarEmLocalStorage(); // Atualiza localStorage com a lista completa
//     this.calcularTotal(); // Atualiza o total

//     // Limpa o formulário
//     this.transacao = new Transacao(0, '', '', '', '', 'entrada', 0);
//   }

//   // Apaga uma transação
//   apagar(transacao: Transacao) {
//     const confirmacao = confirm(`Deseja realmente apagar a transação de '${transacao.nome}'?`);
//     if (!confirmacao) return;

//     const indice = this.transacoes.findIndex(x => x.id === transacao.id);
//     if (indice > -1) {
//       this.transacoes.splice(indice, 1); // Remove do array
//       this.salvarEmLocalStorage(); // Atualiza localStorage
//       this.calcularTotal(); // Atualiza o total
//     }
//   }

//   // Preenche o formulário com os dados para edição
//   preencherCamposParaEditar(transacao: Transacao) {
//     this.transacao = new Transacao(
//       transacao.id,
//       transacao.nome,
//       transacao.cpf,
//       transacao.data,
//       transacao.local,
//       transacao.tipo,
//       transacao.valor,

//     );
//   }
// }
