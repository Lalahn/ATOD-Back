import { IsOptional, IsString } from 'class-validator';

export class UpdateFaultTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
