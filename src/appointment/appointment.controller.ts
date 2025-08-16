import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller({
  path: 'schedule',
})
export class AppointmentController {
  appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  @Get()
  getAppointment() {
    return this.appointmentService.getAppointment();
  }

  @Get('/schedule/:id')
  getAppointmentById(@Param('id') id: number) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Post()
  createAppointment(@Body() appointment) {
    return this.appointmentService.createAppointment(appointment);
  }

  @Put(':id')
  updateAppointment() {
    return this.appointmentService.updateAppointment();
  }

  @Delete(':id')
  deleteAppointment(@Param('id') id: number) {
    return this.appointmentService.deleteAppointment(id);
  }
}
