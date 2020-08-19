// Vamos modificar o funcionamento de uma biblioteca e para isso
// precisamos sobrescrever a tipagem

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}