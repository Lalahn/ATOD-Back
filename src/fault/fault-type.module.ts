import { Module } from '@nestjs/common';
import { FaultTypesController } from './fault-type.controller';
import { FaultTypesService } from './fault-type.service';

@Module({
  controllers: [FaultTypesController],
  providers: [FaultTypesService],
})
export class FaultTypesModule {}
