import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFaultTypeDto } from './dto/create-fault-type.dto';
import { UpdateFaultTypeDto } from './dto/update-fault-type.dto';
import { FaultTypesService } from './fault-type.service';

@Controller('fault-types')
export class FaultTypesController {
  constructor(private readonly faultTypeService: FaultTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFaultTypeDto: CreateFaultTypeDto) {
    return this.faultTypeService.create(createFaultTypeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.faultTypeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.faultTypeService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateFaultTypeDto: UpdateFaultTypeDto,
  ) {
    return this.faultTypeService.update(+id, updateFaultTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.faultTypeService.remove(+id);
  }
}
