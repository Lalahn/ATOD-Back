import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

class VehicleDataDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  license_plate: string;
}

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  diagnosis_date: string;

  @IsNotEmpty()
  @IsString()
  diagnosis_time: string;

  @IsNotEmpty()
  @IsInt()
  fault_type_id: number;

  @IsOptional()
  @IsBoolean()
  request_scan?: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VehicleDataDto)
  vehicle: VehicleDataDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;
}
