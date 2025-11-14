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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VehicleService = class VehicleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validatePlate(license_plate, id) {
        const existingVehicle = await this.prisma.vehicle.findUnique({
            where: { license_plate },
        });
        if (existingVehicle && existingVehicle.id !== id) {
            throw new common_1.BadRequestException(`There is already a vehicle registered with the license plate: ${license_plate}.`);
        }
    }
    async validateCustomer(customer_id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customer_id },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${customer_id} was not found.`);
        }
    }
    async create(createVehicleDto) {
        const { customer_id, license_plate } = createVehicleDto;
        await this.validateCustomer(customer_id);
        await this.validatePlate(license_plate);
        return this.prisma.vehicle.create({
            data: createVehicleDto,
        });
    }
    async findAll() {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Vehicle with ID ${id} was not found.`);
        }
        return vehicle;
    }
    async findByPlate(license_plate) {
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
            throw new common_1.NotFoundException(`The vehicle with plate '${license_plate}' was not found.`);
        }
        return vehicle;
    }
    async update(id, updateVehicleDto) {
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
    async remove(id) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
            include: {
                appointments: true,
            },
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${id} was not found.`);
        }
        if (vehicle.appointments.length > 0) {
            throw new common_1.BadRequestException('The vehicle cannot be deleted because it has associated appointments.');
        }
        return this.prisma.vehicle.delete({
            where: { id },
        });
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map