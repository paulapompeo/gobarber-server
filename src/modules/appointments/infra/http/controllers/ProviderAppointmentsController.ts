import {Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    //vem atraves do middleware de autenticacao
    const provider_id = request.user.id;
    const { day, month, year } = request.query;
    //query -> sempre vem como string, por isso precisamos transformar para number

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day), 
      month: Number(month),
      year: Number(year), 
    });

    return response.json(appointments);
    
  }
}