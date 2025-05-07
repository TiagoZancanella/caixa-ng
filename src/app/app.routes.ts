import { Routes } from '@angular/router';
import { CadastroProdutoComponent } from './components/produtos/cadastro-produto/cadastro-produto.component';
import { CadastroReceitaComponent } from './components/receitas/cadastro-receita/cadastro-receita.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { CadastroTransacaoComponent } from './components/cadastro-transacao/cadastro-transacao.component';


export const routes: Routes = [
    {path: "produtos", component: CadastroProdutoComponent},
    {path: "receitas", component: CadastroReceitaComponent},
    {path: "clientes", component: ClienteComponent},
    {path: "transacao.model", component: CadastroTransacaoComponent},
];
