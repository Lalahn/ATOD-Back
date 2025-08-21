import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FaultType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaultTypeDto } from './dto/create-fault-type.dto';
import { UpdateFaultTypeDto } from './dto/update-fault-type.dto';

@Injectable()
export class FaultTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaultTypeDto: CreateFaultTypeDto): Promise<FaultType> {
    const { name } = createFaultTypeDto;

    const existingFaultType = await this.prisma.faultType.findFirst({
      where: { name },
    });

    if (existingFaultType) {
      throw new BadRequestException(
        `A fault type with the name "${name}" already exists.`,
      );
    }

    return this.prisma.faultType.create({
      data: createFaultTypeDto,
    });
  }

  async findAll(): Promise<FaultType[]> {
    return this.prisma.faultType.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number): Promise<FaultType> {
    const faultType = await this.prisma.faultType.findUnique({
      where: { id },
    });

    if (!faultType) {
      throw new NotFoundException(`Fault type with ID ${id} was not found.`);
    }

    return faultType;
  }

  async update(
    id: number,
    updateFaultTypeDto: UpdateFaultTypeDto,
  ): Promise<FaultType> {
    await this.findOne(id);

    const { name } = updateFaultTypeDto;

    if (name) {
      const existingFaultType = await this.prisma.faultType.findFirst({
        where: {
          name,
          NOT: { id },
        },
      });

      if (existingFaultType) {
        throw new BadRequestException(
          `A fault type with the name "${name}" already exists.`,
        );
      }
    }

    return this.prisma.faultType.update({
      where: { id },
      data: updateFaultTypeDto,
    });
  }

  async remove(id: number): Promise<FaultType> {
    const faultTypeWithAppointments = await this.prisma.faultType.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });

    if (!faultTypeWithAppointments) {
      throw new NotFoundException(`Fault type with ID ${id} was not found.`);
    }

    if (faultTypeWithAppointments.appointments.length > 0) {
      throw new BadRequestException(
        'The fault type cannot be deleted because it has associated appointments.',
      );
    }

    return this.prisma.faultType.delete({
      where: { id },
    });
  }
}
