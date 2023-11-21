import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ required: true })
  description: string;

  @Prop()
  clinicId: string;

  @Prop()
  patientId: string;

  @Prop()
  doctorId: string;

  @Prop()
  date: string;

  _id: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
