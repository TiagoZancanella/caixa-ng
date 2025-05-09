
export class Transacao {
  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public data: string,
    public local: string,
    public tipo: 'entrada' | 'saida',
    public valor: number
  ) {}
}
