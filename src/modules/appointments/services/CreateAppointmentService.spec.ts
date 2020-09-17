import { id } from 'date-fns/locale';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRespository = new FakeAppointmentsRespository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRespository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567890',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567890');
  });

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3)
  // });
});