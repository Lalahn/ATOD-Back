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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaultTypesController = void 0;
const common_1 = require("@nestjs/common");
const create_fault_type_dto_1 = require("./dto/create-fault-type.dto");
const update_fault_type_dto_1 = require("./dto/update-fault-type.dto");
const fault_type_service_1 = require("./fault-type.service");
let FaultTypesController = class FaultTypesController {
    faultTypeService;
    constructor(faultTypeService) {
        this.faultTypeService = faultTypeService;
    }
    create(createFaultTypeDto) {
        return this.faultTypeService.create(createFaultTypeDto);
    }
    findAll() {
        return this.faultTypeService.findAll();
    }
    findOne(id) {
        return this.faultTypeService.findOne(+id);
    }
    update(id, updateFaultTypeDto) {
        return this.faultTypeService.update(+id, updateFaultTypeDto);
    }
    remove(id) {
        return this.faultTypeService.remove(+id);
    }
};
exports.FaultTypesController = FaultTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fault_type_dto_1.CreateFaultTypeDto]),
    __metadata("design:returntype", void 0)
], FaultTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaultTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaultTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fault_type_dto_1.UpdateFaultTypeDto]),
    __metadata("design:returntype", void 0)
], FaultTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaultTypesController.prototype, "remove", null);
exports.FaultTypesController = FaultTypesController = __decorate([
    (0, common_1.Controller)('fault-types'),
    __metadata("design:paramtypes", [fault_type_service_1.FaultTypesService])
], FaultTypesController);
//# sourceMappingURL=fault-type.controller.js.map