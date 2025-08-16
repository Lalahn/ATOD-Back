import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller({
  path: 'schedule',
})
export class ScheduleController {
  scheduleService: ScheduleService;

  constructor(scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  @Get()
  getSchedule() {
    return this.scheduleService.getSchedule();
  }

  @Get('/schedule/:id')
  getScheduleById(@Param('id') id: number) {
    return this.scheduleService.getScheduleById(id);
  }

  @Post()
  createSchedule(@Body() schedule) {
    return this.scheduleService.createSchedule(schedule);
  }

  @Put(':id')
  updateSchedule() {
    return this.scheduleService.updateSchedule();
  }

  @Delete(':id')
  deleteSchedule(@Param('id') id: number) {
    return this.scheduleService.deleteSchedule(id);
  }
}
