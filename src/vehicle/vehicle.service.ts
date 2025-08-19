import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  private async validatePlate(
    license_plate: string,
    id?: number,
  ): Promise<void> {
    const existingVehicle = await this.prisma.vehicle.findUnique({
      where: { license_plate },
    });

    if (existingVehicle && existingVehicle.id !== id) {
      throw new BadRequestException(
        `There is already a vehicle registered with the license plate: ${license_plate}.`,
      );
    }
  }

  private async validateCustomer(customer_id: number): Promise<void> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customer_id },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${customer_id} was not found.`,
      );
    }
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { customer_id, license_plate } = createVehicleDto;

    await this.validateCustomer(customer_id);
    await this.validatePlate(license_plate);

    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  async findAll(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      include: {
        customer: true,
        appointments: {
          include: {
            fault_type: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        customer: true,
        appointments: {
          include: {
            fault_type: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} was not found.`);
    }

    return vehicle;
  }

  async findByPlate(license_plate: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { license_plate },
      include: {
        customer: true,
        appointments: {
          include: {
            fault_type: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `The vehicle with plate '${license_plate}' was not found.`,
      );
    }

    return vehicle;
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.findOne(id);

    const { license_plate, customer_id, ...dataToUpdate } = updateVehicleDto;

    if (license_plate) {
      await this.validatePlate(license_plate, id);
    }

    if (customer_id) {
      await this.validateCustomer(customer_id);
    }

    return this.prisma.vehicle.update({
      where: { id },
      data: {
        ...dataToUpdate,
        ...(license_plate && { license_plate }),
        ...(customer_id && { customer_id }),
      },
      include: {
        customer: true,
      },
    });
  }

  async remove(id: number): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} was not found.`);
    }

    if (vehicle.appointments.length > 0) {
      throw new BadRequestException(
        'The vehicle cannot be deleted because it has associated appointments.',
      );
    }

    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
