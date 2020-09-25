import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRespository: FakeUsersRespository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    listProviders = new ListProvidersService(fakeUsersRespository);
  });

  it('should be able to list providers', async () => { 
    const user1 = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    
    const user2 =await fakeUsersRespository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '1234567'
    });
    
    const loggedUser = await fakeUsersRespository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '1234567'
    });
    
    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1, user2
    ]);
  });
});