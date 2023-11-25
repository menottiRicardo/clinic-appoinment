import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  description: string;

  @Prop()
  title: string;

  @Prop({ index: true })
  doctorId: string;

  @Prop()
  duration: string;

  _id: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
