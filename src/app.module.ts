import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [AppointmentModule, CustomerModule, VehicleModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
