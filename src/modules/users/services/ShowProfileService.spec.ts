import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRespository: FakeUsersRespository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    showProfile = new ShowProfileService(fakeUsersRespository);
  });

  it('should be able to show profile', async () => { 
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    
    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show a non-existing profile', async () => { 
    expect(showProfile.execute({
        user_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError);
  });
});