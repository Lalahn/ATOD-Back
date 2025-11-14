import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
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
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
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
    updatePatch(id: number, UpdateCustomerDto: UpdateCustomerDto): Promise<{
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
