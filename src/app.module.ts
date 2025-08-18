import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AppointmentModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
