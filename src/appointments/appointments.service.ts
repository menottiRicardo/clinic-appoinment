import { Inject, Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointments.schema';
import { Model } from 'mongoose';
import { Event } from 'src/events/events.schema';
import { Availability } from 'src/availability/availability.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointments: Model<Appointment>,
    @InjectModel(Event.name) private events: Model<Event>,
    @InjectModel(Availability.name) private availability: Model<Availability>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  create(appointment: Appointment) {
    return this.appointments.create(appointment);
  }

  findAll(userId: string) {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async findScheduleInfo(doctorId: string) {
    // find all the events for a given doctor
    const events = await this.events.find({ doctorId });

    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const availability: Availability = await this.availability.findOne({
      doctorId,
    });

    const appointments = await this.appointments.find({ doctorId });
    // calculate the availability for each day reducing the appointments already scheduled in time slots of 5 minutes
    const daysOff = [];

    days.forEach((day) => {
      if (!availability[day].available) {
        daysOff.push(days.indexOf(day));
      }
    });

    const doc = await firstValueFrom(
      this.authClient.send('get_doc_by_id', doctorId),
    );

    const doctor = {
      name: doc.firstName + ' ' + doc.lastName,
      clinic: {
        name: doc.clinic.name,
      },
    };
    return { events, availability, appointments, daysOff, doctor };
  }
}
