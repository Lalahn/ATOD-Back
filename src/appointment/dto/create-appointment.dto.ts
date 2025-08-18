import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'vehicle_id is required' })
  @IsInt({ message: 'vehicle_id must be an integer' })
  @Type(() => Number)
  vehicle_id: number;

  @IsNotEmpty({ message: 'diagnosis_date is required' })
  @IsDateString({}, { message: 'diagnosis_date must be a valid date' })
  diagnosis_date: string;

  @IsNotEmpty({ message: 'diagnosis_time is required' })
  diagnosis_time: string;

  @IsNotEmpty({ message: 'fault_type_id is required' })
  @IsInt({ message: 'fault_type_id must be an integer' })
  @Type(() => Number)
  fault_type_id: number;

  @IsOptional()
  @IsBoolean({ message: 'request_scan must be a boolean' })
  @Type(() => Boolean)
  request_scan?: boolean = false;
}
