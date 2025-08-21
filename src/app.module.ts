import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { CustomerModule } from './customer/customer.module';
import { FaultTypesModule } from './fault/fault-type.module';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    AppointmentModule,
    CustomerModule,
    VehicleModule,
    FaultTypesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
