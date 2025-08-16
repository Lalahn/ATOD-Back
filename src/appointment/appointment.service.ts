import { Injectable } from '@nestjs/common';
import { appointments } from '../mocks/appointments';

@Injectable()
export class AppointmentService {
  getAppointment() {
    return appointments;
  }

  getAppointmentById(id: number) {
    return appointments.find((appointment) => appointment.id === id);
  }

  createAppointment(appointment) {
    appointments.push(appointment);
    return 'Appointment created';
  }

  updateAppointment() {
    return 'Appointment updated';
  }

  deleteAppointment(id: number) {
    return 'Appointment deleted ' + id;
  }
}
