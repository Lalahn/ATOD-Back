import { Injectable } from '@nestjs/common';
import { schedules } from '../mocks/schedules';

@Injectable()
export class ScheduleService {
  getSchedule() {
    return schedules;
  }

  getScheduleById(id: number) {
    return schedules.find((schedule) => schedule.id === id);
  }

  createSchedule(schedule) {
    schedules.push(schedule);
    return 'Schedule created';
  }

  updateSchedule() {
    return 'Schedule updated';
  }

  deleteSchedule(id: number) {
    return 'Schedule deleted ' + id;
  }
}
