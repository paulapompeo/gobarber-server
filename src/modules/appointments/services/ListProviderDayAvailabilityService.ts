import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({provider_id, day, month, year}: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month, 
      year,
    })

    const hourStart = 8;

    const eachHourArrar = Array.from({ length: 10}, (_, index) => index + hourStart, );

    const currentDate = new Date(Date.now());
    
    const availability = eachHourArrar.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => 
        getHours(appointment.date) ===  hour
      );

      const compareDate = new Date(year, month -1, day, hour )
      //2020-05-20 08:00:00

      return {
        hour, 
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;