import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        diagnosis_date: Date;
        diagnosis_time: Date;
        fault_type_id: number;
        request_scan: boolean;
        vehicle_id: number;
        id: number;
        created_at: Date;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    updatePatch(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<any>;
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
