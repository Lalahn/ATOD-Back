import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  vehicle_id?: number;

  @IsOptional()
  @IsDateString()
  diagnosis_date?: string;

  @IsOptional()
  @IsDateString()
  diagnosis_time?: string;

  @IsOptional()
  @IsInt()
  fault_type_id?: number;

  @IsOptional()
  @IsBoolean()
  request_scan?: boolean;
}
