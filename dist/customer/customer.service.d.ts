import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        first_name: string;
        last_name: string;
        document_number: string;
        document_type: string;
        email: string;
        phone_number: string;
        id: number;
        created_at: Date;
    }>;
    transformData(customer: any): any;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findByPhone(phone: string): Promise<({
        vehicles: {
            customer_id: number;
            make: string;
            model: string;
            license_plate: string;
            id: number;
            created_at: Date;
        }[];
    } & {
        first_name: string;
        last_name: string;
        document_number: string;
        document_type: string;
        email: string;
        phone_number: string;
        id: number;
        created_at: Date;
    })[]>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<{
        vehicles: {
            customer_id: number;
            make: string;
            model: string;
            license_plate: string;
            id: number;
            created_at: Date;
        }[];
    } & {
        first_name: string;
        last_name: string;
        document_number: string;
        document_type: string;
        email: string;
        phone_number: string;
        id: number;
        created_at: Date;
    }>;
    remove(id: number): Promise<{
        vehicles: {
            customer_id: number;
            make: string;
            model: string;
            license_plate: string;
            id: number;
            created_at: Date;
        }[];
    } & {
        first_name: string;
        last_name: string;
        document_number: string;
        document_type: string;
        email: string;
        phone_number: string;
        id: number;
        created_at: Date;
    }>;
}
