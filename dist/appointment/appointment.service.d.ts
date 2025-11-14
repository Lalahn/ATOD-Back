import { Appointment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    transformData(appointment: any): any;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<any>;
    remove(id: number): Promise<{
        vehicle: {
            customer: {
                first_name: string;
                last_name: string;
                document_number: string;
                document_type: string;
                email: string;
                phone_number: string;
                id: number;
                created_at: Date;
            };
        } & {
            customer_id: number;
            make: string;
            model: string;
            license_plate: string;
            id: number;
            created_at: Date;
        };
        fault_type: {
            name: string;
            id: number;
            description: string | null;
        };
    } & {
        diagnosis_date: Date;
        diagnosis_time: Date;
        fault_type_id: number;
        request_scan: boolean;
        vehicle_id: number;
        id: number;
        created_at: Date;
    }>;
}
