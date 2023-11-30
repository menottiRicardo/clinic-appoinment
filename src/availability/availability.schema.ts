import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

export class Day {
  available: boolean;
  hours: {
    start: string;
    end: string;
  }[];
}

@Schema()
export class Availability {
  @Prop({ unique: true, required: true })
  doctorId: string;

  @Prop()
  monday: Day;

  @Prop()
  tuesday: Day;

  @Prop()
  thursday: Day;

  @Prop()
  friday: Day;

  @Prop()
  wednesday: Day;

  @Prop()
  saturday: Day;

  @Prop()
  sunday: Day;

  _id: string;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
