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
exports.FaultTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FaultTypesService = class FaultTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFaultTypeDto) {
        const { name } = createFaultTypeDto;
        const existingFaultType = await this.prisma.faultType.findFirst({
            where: { name },
        });
        if (existingFaultType) {
            throw new common_1.BadRequestException(`A fault type with the name "${name}" already exists.`);
        }
        return this.prisma.faultType.create({
            data: createFaultTypeDto,
        });
    }
    async findAll() {
        return this.prisma.faultType.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const faultType = await this.prisma.faultType.findUnique({
            where: { id },
        });
        if (!faultType) {
            throw new common_1.NotFoundException(`Fault type with ID ${id} was not found.`);
        }
        return faultType;
    }
    async update(id, updateFaultTypeDto) {
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
                throw new common_1.BadRequestException(`A fault type with the name "${name}" already exists.`);
            }
        }
        return this.prisma.faultType.update({
            where: { id },
            data: updateFaultTypeDto,
        });
    }
    async remove(id) {
        const faultTypeWithAppointments = await this.prisma.faultType.findUnique({
            where: { id },
            include: {
                appointments: true,
            },
        });
        if (!faultTypeWithAppointments) {
            throw new common_1.NotFoundException(`Fault type with ID ${id} was not found.`);
        }
        if (faultTypeWithAppointments.appointments.length > 0) {
            throw new common_1.BadRequestException('The fault type cannot be deleted because it has associated appointments.');
        }
        return this.prisma.faultType.delete({
            where: { id },
        });
    }
};
exports.FaultTypesService = FaultTypesService;
exports.FaultTypesService = FaultTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FaultTypesService);
//# sourceMappingURL=fault-type.service.js.map