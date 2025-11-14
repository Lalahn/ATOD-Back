import { FaultType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaultTypeDto } from './dto/create-fault-type.dto';
import { UpdateFaultTypeDto } from './dto/update-fault-type.dto';
export declare class FaultTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFaultTypeDto: CreateFaultTypeDto): Promise<FaultType>;
    findAll(): Promise<FaultType[]>;
    findOne(id: number): Promise<FaultType>;
    update(id: number, updateFaultTypeDto: UpdateFaultTypeDto): Promise<FaultType>;
    remove(id: number): Promise<FaultType>;
}
