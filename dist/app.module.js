"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const appointment_module_1 = require("./appointment/appointment.module");
const customer_module_1 = require("./customer/customer.module");
const fault_type_module_1 = require("./fault/fault-type.module");
const prisma_module_1 = require("./prisma/prisma.module");
const vehicle_module_1 = require("./vehicle/vehicle.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            appointment_module_1.AppointmentModule,
            customer_module_1.CustomerModule,
            vehicle_module_1.VehicleModule,
            fault_type_module_1.FaultTypesModule,
            prisma_module_1.PrismaModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map