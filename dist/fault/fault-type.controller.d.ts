import { CreateFaultTypeDto } from './dto/create-fault-type.dto';
import { UpdateFaultTypeDto } from './dto/update-fault-type.dto';
import { FaultTypesService } from './fault-type.service';
export declare class FaultTypesController {
    private readonly faultTypeService;
    constructor(faultTypeService: FaultTypesService);
    create(createFaultTypeDto: CreateFaultTypeDto): Promise<{
        name: string;
        id: number;
        description: string | null;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
    }>;
    update(id: string, updateFaultTypeDto: UpdateFaultTypeDto): Promise<{
        name: string;
        id: number;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
    }>;
}
