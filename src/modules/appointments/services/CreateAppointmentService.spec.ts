import AppError from '@shared/errors/AppError';

import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRespository: FakeAppointmentsRespository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRespository = new FakeAppointmentsRespository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRespository);
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123456',
      provider_id: '1234567890',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567890');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

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
});