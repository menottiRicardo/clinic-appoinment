import { Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './events.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private appointments: Model<Event>) {}
  create(event: Event, user: any) {
    return this.appointments.create({
      ...event,
      doctorId: user._id,
    });
  }

  findAll(doctorId: string) {
    return this.appointments.find({ doctorId });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string): any {
    return this.appointments.deleteOne({ _id: id });
  }
}
