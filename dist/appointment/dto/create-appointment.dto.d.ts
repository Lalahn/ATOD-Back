import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
declare class VehicleDataDto {
    make: string;
    model: string;
    license_plate: string;
}
export declare class CreateAppointmentDto {
    diagnosis_date: string;
    diagnosis_time: string;
    fault_type_id: number;
    request_scan?: boolean;
    vehicle: VehicleDataDto;
    customer: CreateCustomerDto;
}
export {};
