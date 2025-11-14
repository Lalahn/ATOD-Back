"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomerService = class CustomerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCustomerDto) {
        const { first_name, last_name, email, phone_number, document_number, document_type, } = createCustomerDto;
        if (document_number) {
            const existingCustomer = await this.prisma.customer.findFirst({
                where: { document_number },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException(`There is already a customer with the ${document_type} ${document_number}`);
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
    transformData(customer) {
        const allAppointments = [];
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
        const transformedCustomers = customers.map((customer) => this.transformData(customer));
        return transformedCustomers;
    }
    async findOne(id) {
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
    async findByEmail(email) {
        const customer = await this.prisma.customer.findFirst({
            where: { email },
            include: {
                vehicles: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`The customer with email ${email} was not found.`);
        }
        return this.transformData(customer);
    }
    async findByPhone(phone) {
        const customers = await this.prisma.customer.findMany({
            where: { phone_number: phone },
            include: {
                vehicles: true,
            },
        });
        if (!customers) {
            throw new common_1.NotFoundException(`The customer with phone number ${phone} was not found.`);
        }
        return customers;
    }
    async update(id, updateCustomerDto) {
        await this.findOne(id);
        const { first_name, last_name, email, phone_number, document_number, document_type, } = updateCustomerDto;
        if (email) {
            const existingCustomer = await this.prisma.customer.findFirst({
                where: {
                    email,
                    NOT: { id },
                },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException(`There is already another customer with the email: ${email}.`);
            }
        }
        const updateData = {};
        if (first_name !== undefined)
            updateData.first_name = first_name;
        if (last_name !== undefined)
            updateData.last_name = last_name;
        if (email !== undefined)
            updateData.email = email;
        if (phone_number !== undefined)
            updateData.phone_number = phone_number;
        if (document_number !== undefined)
            updateData.document_number = document_number;
        if (document_type !== undefined)
            updateData.document_type = document_type;
        return this.prisma.customer.update({
            where: { id },
            data: updateData,
            include: {
                vehicles: true,
            },
        });
    }
    async remove(id) {
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
        const hasAppointments = customerWithAppointments?.vehicles.some((vehicle) => vehicle.appointments.length > 0);
        if (hasAppointments) {
            throw new common_1.BadRequestException('The customer cannot be deleted because it has associated appointments.');
        }
        return this.prisma.customer.delete({
            where: { id },
            include: {
                vehicles: true,
            },
        });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map