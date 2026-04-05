import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory(@Query('indicatorId') indicatorId?: string) {
    return await this.historyService.findAllHistory(indicatorId);
  }
}
