import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from '@prisma/client';
export declare class VehicleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private validatePlate;
    private validateCustomer;
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(): Promise<Vehicle[]>;
    findOne(id: number): Promise<Vehicle>;
    findByPlate(license_plate: string): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<Vehicle>;
}
