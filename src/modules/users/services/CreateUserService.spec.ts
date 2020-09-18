import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRespository,fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'

    });

    expect(user).toHaveProperty('id');
  });


  it('shuold not be able to creat a new user with same email from another', async () => {
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRespository, fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });

    expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  });
});