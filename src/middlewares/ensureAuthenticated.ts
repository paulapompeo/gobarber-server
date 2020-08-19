import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

// criado para que tudo o que executar apos esse arquivo, tratar apenas do usuario em questao
interface TokenPayload {
  iat: number; 
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    //Validaçao do Token JWT
   
    //vem pelo header
    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('JWT token is missing', 401);
    }

    //Formato do token -> Bearer dsdsadsahudsa
    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      // tratar apenas do usuário em questao
      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new AppError('Invalid JWT token', 401);
    }
  }