import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, Customer, Vehicle } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const {
      vehicle: vehicleData,
      customer: customerData,
      fault_type_id,
      diagnosis_date,
      diagnosis_time,
      request_scan,
    } = createAppointmentDto;

    let customer: Customer;
    try {
      customer = await this.prisma.customer.upsert({
        where: { document_number: customerData.document_number },
        update: {},
        create: customerData,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error processing customer data.');
    }

    let vehicle: Vehicle;
    try {
      vehicle = await this.prisma.vehicle.upsert({
        where: {
          license_plate: vehicleData.license_plate,
        },
        update: {},
        create: { ...vehicleData, customer_id: customer.id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error processing vehicle data.');
    }

    const faultType = await this.prisma.faultType.findUnique({
      where: { id: fault_type_id },
    });

    if (!faultType) {
      throw new BadRequestException(
        `Fault type with ID ${fault_type_id} does not exist`,
      );
    }

    try {
      const diagnosisDate = new Date(diagnosis_date);
      const diagnosisTime = new Date(`1970-01-01T${diagnosis_time}`);

      // Valida si las fechas son válidas antes de usarlas
      if (isNaN(diagnosisDate.getTime())) {
        throw new BadRequestException('Invalid diagnosis_date format.');
      }
      if (isNaN(diagnosisTime.getTime())) {
        throw new BadRequestException('Invalid diagnosis_time format.');
      }

      return this.prisma.appointment.create({
        data: {
          vehicle_id: vehicle.id,
          fault_type_id,
          diagnosis_date: diagnosisDate,
          diagnosis_time: diagnosisTime,
          request_scan: request_scan ?? false,
        },
        include: {
          vehicle: {
            include: {
              customer: true,
            },
          },
          fault_type: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error creating the appointment. Please check the provided data.',
      );
    }
  }

  transformData(appointment: any) {
    const { vehicle, ...appointmensData } = appointment;
    const { customer, ...vehiclesWithoutCustomer } = vehicle;

    return {
      ...appointmensData,
      vehicle: vehiclesWithoutCustomer,
      customer: vehicle.customer,
    };
  }

  async findAll() {
    const appointmens = await this.prisma.appointment.findMany({
      include: {
        vehicle: {
          include: {
            customer: true,
          },
        },
        fault_type: true,
      },
      orderBy: [{ diagnosis_date: 'asc' }, { diagnosis_time: 'asc' }],
    });

    const transformedAppointments = appointmens.map((appointmen) =>
      this.transformData(appointmen),
    );

    return transformedAppointments;
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            customer: true,
          },
        },
        fault_type: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} was not found`);
    }

    return this.transformData(appointment);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<any> {
    await this.findOne(id);

    const {
      vehicle_id,
      fault_type_id,
      diagnosis_date,
      diagnosis_time,
      request_scan,
    } = updateAppointmentDto;

    if (vehicle_id) {
      const vehicle = await this.prisma.vehicle.findUnique({
        where: { id: vehicle_id },
      });
      if (!vehicle) {
        throw new BadRequestException(
          `The vehicle with ID ${vehicle_id} does not exist.`,
        );
      }
    }

    if (fault_type_id) {
      const faultType = await this.prisma.faultType.findUnique({
        where: { id: fault_type_id },
      });
      if (!faultType) {
        throw new BadRequestException(
          `The fault type with ID ${fault_type_id} does not exist.`,
        );
      }
    }

    const updateData: any = {};
    if (diagnosis_date !== undefined) {
      updateData.diagnosis_date = new Date(diagnosis_date);
    }
    if (diagnosis_time !== undefined) {
      updateData.diagnosis_time = new Date(`1970-01-01T${diagnosis_time}:00`);
    }
    if (request_scan !== undefined) {
      updateData.request_scan = request_scan;
    }
    if (vehicle_id !== undefined) {
      updateData.vehicle_id = vehicle_id;
    }
    if (fault_type_id !== undefined) {
      updateData.fault_type_id = fault_type_id;
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        vehicle: {
          include: {
            customer: true,
          },
        },
        fault_type: true,
      },
    });

    return this.transformData(updatedAppointment);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.appointment.delete({
      where: { id },
      include: {
        vehicle: {
          include: {
            customer: true,
          },
        },
        fault_type: true,
      },
    });
  }
}
