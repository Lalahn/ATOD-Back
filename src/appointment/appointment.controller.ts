import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller({
  path: 'appointments',
})
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.appointmentService.findByCustomer(customerId);
  }

  @Get('vehicle/:vehicleId')
  findByVehicle(@Param('vehicleId', ParseIntPipe) vehicleId: number) {
    return this.appointmentService.findByVehicle(vehicleId);
  }
}
