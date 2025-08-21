import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFaultTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
