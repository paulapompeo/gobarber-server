// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list day availability from provider', async () => { 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // maio = 4
      date: new Date(2020, 4, 20, 8, 0, 0 ),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // maio = 4
      date: new Date(2020, 4, 20, 10, 0, 0 ),
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      //no service maio = 5
      month: 5,
      day: 20
    })

    //sobre a resposta
    //espero que seja um array
    // 20 2 21 com available: false
    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },

    ]))
  });
});