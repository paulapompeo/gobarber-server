import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
  email: string,
  password: string,
}

interface Response {
  user: User,
  token: string;

}

class AuthenticateUserService {
  public async execute({ email, password}: Request): Promise<Response> {
    const userRepository = getRepository(User);
    //verificar se o email é valido
    const user = await userRepository.findOne({where: { email }});

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //se passou, o usuário está autenticado

    const { secret, expiresIn } = authConfig.jwt; 
    //primeiro argumento: payload(nome/permissoes do usuario) ->não podemos por informaçoes que exigem segurança
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;