import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  user: User,
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}


  public async execute({ email, password}: IRequest): Promise<IResponse> {
    //verificar se o email é valido
    const user = await this.usersRepository.findByEmail(email);

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