import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRespository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRespository: FakeUsersRespository;
let fakeUserTokensRespository: FakeUserTokensRespository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeUserTokensRespository = new FakeUserTokensRespository();

    resetPassword = new ResetPasswordService(
      fakeUsersRespository,
      fakeUserTokensRespository
    );
  })

  it('should be able to reset the password', async () => {
     const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRespository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRespository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});

// RED
// GREEN
// REFACTOR
