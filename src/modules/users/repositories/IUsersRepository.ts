import User from '../infra/typeorm/entities/User';
import ICreateAppointmentDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateAppointmentDTO): Promise<User>;
  save(user: User): Promise<User>;
}