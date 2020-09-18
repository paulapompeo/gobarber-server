import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRespository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRespository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '1234567'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});