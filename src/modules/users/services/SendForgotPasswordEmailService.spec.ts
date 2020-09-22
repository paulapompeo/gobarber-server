import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRespository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRespository: FakeUsersRespository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRespository: FakeUserTokensRespository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRespository = new FakeUserTokensRespository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRespository,
      fakeMailProvider,
      fakeUserTokensRespository
    );
  })

  it('should be able to recorver password using email', async () => {
   
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRespository, 'generate');
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  })
});

// RED
// GREEN
// REFACTOR
