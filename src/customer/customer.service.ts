import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      document_number,
      document_type,
    } = createCustomerDto;

    if (document_number) {
      const existingCustomer = await this.prisma.customer.findFirst({
        where: { document_number },
      });

      if (existingCustomer) {
        throw new BadRequestException(
          `There is already a customer with the ${document_type} ${document_number}`,
        );
      }
    }

    return this.prisma.customer.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        document_number,
        document_type,
      },
    });
  }

  transformData(customer: any) {
    const allAppointments: Array<{}> = [];

    const vehiclesWithoutAppointments = customer.vehicles.map((vehicle) => {
      allAppointments.push(...vehicle.appointments);

      const { appointments, ...vehicleWithoutAppointments } = vehicle;
      return vehicleWithoutAppointments;
    });

    const { vehicles, ...customerData } = customer;

    return {
      ...customerData,
      vehicles: vehiclesWithoutAppointments,
      appointments: allAppointments,
    };
  }

  async findAll() {
    const customers = await this.prisma.customer.findMany({
      include: {
        vehicles: {
          include: {
            appointments: {
              include: {
                fault_type: true,
              },
              orderBy: { diagnosis_date: 'desc' },
            },
          },
        },
      },
      orderBy: { last_name: 'asc' },
    });

    const transformedCustomers = customers.map((customer) =>
      this.transformData(customer),
    );

    return transformedCustomers;
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        vehicles: {
          include: {
            appointments: {
              include: {
                fault_type: true,
              },
              orderBy: { diagnosis_date: 'desc' },
            },
          },
        },
      },
    });

    return this.transformData(customer);
  }

  async findByEmail(email: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
      include: {
        vehicles: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(
        `The customer with email ${email} was not found.`,
      );
    }

    return this.transformData(customer);
  }

  async findByPhone(phone: string) {
    const customers = await this.prisma.customer.findMany({
      where: { phone_number: phone },
      include: {
        vehicles: true,
      },
    });

    if (!customers) {
      throw new NotFoundException(
        `The customer with phone number ${phone} was not found.`,
      );
    }

    return customers;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);

    const {
      first_name,
      last_name,
      email,
      phone_number,
      document_number,
      document_type,
    } = updateCustomerDto;

    if (email) {
      const existingCustomer = await this.prisma.customer.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (existingCustomer) {
        throw new BadRequestException(
          `There is already another customer with the email: ${email}.`,
        );
      }
    }

    const updateData: any = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (email !== undefined) updateData.email = email;
    if (phone_number !== undefined) updateData.phone_number = phone_number;
    if (document_number !== undefined)
      updateData.document_number = document_number;
    if (document_type !== undefined) updateData.document_type = document_type;

    return this.prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        vehicles: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const customerWithAppointments = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        vehicles: {
          include: {
            appointments: true,
          },
        },
      },
    });

    const hasAppointments = customerWithAppointments?.vehicles.some(
      (vehicle) => vehicle.appointments.length > 0,
    );

    if (hasAppointments) {
      throw new BadRequestException(
        'The customer cannot be deleted because it has associated appointments.',
      );
    }

    return this.prisma.customer.delete({
      where: { id },
      include: {
        vehicles: true,
      },
    });
  }
}
