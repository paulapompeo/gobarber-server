import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRespository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRespository.create({
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

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  
  it('should not be able to authenticate with wrong password/email combination', async () => {
    await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    })

    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'worng-password'
    })).rejects.toBeInstanceOf(AppError);
  });
});