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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AppointmentService = class AppointmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAppointmentDto) {
        const { vehicle: vehicleData, customer: customerData, fault_type_id, diagnosis_date, diagnosis_time, request_scan, } = createAppointmentDto;
        let customer;
        try {
            customer = await this.prisma.customer.upsert({
                where: { document_number: customerData.document_number },
                update: {},
                create: customerData,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        let vehicle;
        try {
            vehicle = await this.prisma.vehicle.upsert({
                where: {
                    license_plate: vehicleData.license_plate,
                },
                update: {},
                create: { ...vehicleData, customer_id: customer.id },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        const faultType = await this.prisma.faultType.findUnique({
            where: { id: fault_type_id },
        });
        if (!faultType) {
            throw new common_1.BadRequestException(`Fault type with ID ${fault_type_id} does not exist`);
        }
        try {
            const diagnosisDate = new Date(diagnosis_date);
            const diagnosisTime = new Date(`1970-01-01T${diagnosis_time}`);
            if (isNaN(diagnosisDate.getTime())) {
                throw new common_1.BadRequestException('Invalid diagnosis_date format.');
            }
            if (isNaN(diagnosisTime.getTime())) {
                throw new common_1.BadRequestException('Invalid diagnosis_time format.');
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error creating the appointment. Please check the provided data.');
        }
    }
    transformData(appointment) {
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
        const transformedAppointments = appointmens.map((appointmen) => this.transformData(appointmen));
        return transformedAppointments;
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Appointment with ID ${id} was not found`);
        }
        return this.transformData(appointment);
    }
    async update(id, updateAppointmentDto) {
        await this.findOne(id);
        const { vehicle_id, fault_type_id, diagnosis_date, diagnosis_time, request_scan, } = updateAppointmentDto;
        if (vehicle_id) {
            const vehicle = await this.prisma.vehicle.findUnique({
                where: { id: vehicle_id },
            });
            if (!vehicle) {
                throw new common_1.BadRequestException(`The vehicle with ID ${vehicle_id} does not exist.`);
            }
        }
        if (fault_type_id) {
            const faultType = await this.prisma.faultType.findUnique({
                where: { id: fault_type_id },
            });
            if (!faultType) {
                throw new common_1.BadRequestException(`The fault type with ID ${fault_type_id} does not exist.`);
            }
        }
        const updateData = {};
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
    async remove(id) {
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
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map