import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { appointments } from '../mocks/appointments';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const {
      vehicle_id,
      fault_type_id,
      diagnosis_date,
      diagnosis_time,
      request_scan,
    } = createAppointmentDto;

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicle_id },
      include: { customer: true },
    });

    if (!vehicle) {
      throw new BadRequestException(
        `El vehículo con ID ${vehicle_id} no existe`,
      );
    }

    const faultType = await this.prisma.faultType.findUnique({
      where: { id: fault_type_id },
    });

    if (!faultType) {
      throw new BadRequestException(
        `El tipo de falla con ID ${fault_type_id} no existe`,
      );
    }

    return this.prisma.appointment.create({
      data: {
        vehicle_id,
        fault_type_id,
        diagnosis_date: new Date(diagnosis_date),
        diagnosis_time: new Date(`1970-01-01T${diagnosis_time}:00`),
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
  }

  async findAll() {
    return this.prisma.appointment.findMany({
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
      throw new NotFoundException(`La cita con ID ${id} no fue encontrada`);
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
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
          `El vehículo con ID ${vehicle_id} no existe`,
        );
      }
    }

    if (fault_type_id) {
      const faultType = await this.prisma.faultType.findUnique({
        where: { id: fault_type_id },
      });

      if (!faultType) {
        throw new BadRequestException(
          `El tipo de falla con ID ${fault_type_id} no existe`,
        );
      }
    }

    const updateData: any = {};

    if (vehicle_id !== undefined) updateData.vehicle_id = vehicle_id;
    if (fault_type_id !== undefined) updateData.fault_type_id = fault_type_id;
    if (diagnosis_date !== undefined)
      updateData.diagnosis_date = new Date(diagnosis_date);
    if (diagnosis_time !== undefined)
      updateData.diagnosis_time = new Date(`1970-01-01T${diagnosis_time}:00`);
    if (request_scan !== undefined) updateData.request_scan = request_scan;

    return this.prisma.appointment.update({
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

  async findByCustomer(customerId: number) {
    return this.prisma.appointment.findMany({
      where: {
        vehicle: {
          customer_id: customerId,
        },
      },
      include: {
        vehicle: true,
        fault_type: true,
      },
      orderBy: [{ diagnosis_date: 'desc' }, { diagnosis_time: 'desc' }],
    });
  }

  async findByVehicle(vehicleId: number) {
    return this.prisma.appointment.findMany({
      where: {
        vehicle_id: vehicleId,
      },
      include: {
        vehicle: {
          include: {
            customer: true,
          },
        },
        fault_type: true,
      },
      orderBy: [{ diagnosis_date: 'desc' }, { diagnosis_time: 'desc' }],
    });
  }
}
