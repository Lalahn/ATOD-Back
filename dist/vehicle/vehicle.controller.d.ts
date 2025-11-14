import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    create(createVehicleDto: CreateVehicleDto): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }>;
    findAll(): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }>;
    findByPlate(license_plate: string): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }>;
    remove(id: string): Promise<{
        customer_id: number;
        make: string;
        model: string;
        license_plate: string;
        id: number;
        created_at: Date;
    }>;
}
