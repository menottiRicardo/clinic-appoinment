import { Injectable } from '@nestjs/common';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Availability } from './availability.schema';
import { Model } from 'mongoose';
@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name) private availability: Model<Availability>,
  ) {}
  create(availability: Availability) {
    return this.availability.create(availability);
  }

  findAll() {
    return `This action returns all availability`;
  }

  findOne(doctorId: string) {
    return this.availability.findOne({ doctorId });
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
