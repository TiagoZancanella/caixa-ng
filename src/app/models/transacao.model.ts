
export class Transacao {
  constructor(
    public id: number = 0,
    public nome: string = "",
    public cpf: string = "",
    public data: string = "",
    public local: string = "",
    public tipo: 'entrada' | 'saida' = 'entrada',
    public valor: number = 0
  
  
  ) 
  {}
}
