import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointments.schema';
import { Public } from 'src/core/decorators/allow.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() appt: Appointment) {
    return this.appointmentsService.create(appt);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.appointmentsService.findAll(req.user._id);
  }

  @Public()
  @Get('schedule/:doctorId')
  findScheduleInfo(@Param('doctorId') doctorId: string) {
    return this.appointmentsService.findScheduleInfo(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
