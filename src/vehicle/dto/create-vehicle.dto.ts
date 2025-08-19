import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  Min,
  IsAlphanumeric,
} from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @Min(1)
  customer_id: number;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  license_plate: string;
}
