import AppError from '@shared/errors/AppError';

import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRespository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRespository: FakeAppointmentsRespository;
let fakeNotificationsRespository: FakeNotificationsRespository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRespository = new FakeAppointmentsRespository();
    fakeNotificationsRespository = new FakeNotificationsRespository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRespository, fakeNotificationsRespository);
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '1234567890',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567890');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 9, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '1234567890',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '1234567890',
    })).rejects.toBeInstanceOf(AppError)
  });
  
  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123456',
      provider_id: '1234567890',
    })).rejects.toBeInstanceOf(AppError)
  });
  
  it('should not be able to create an appointments with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '123456',
    })).rejects.toBeInstanceOf(AppError)
  });
  
  it('should not be able to create an appointments with unvalid time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '123456',
      provider_id: '1234567890',
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '123456',
      provider_id: '1234567890',
    })).rejects.toBeInstanceOf(AppError)
  });
});