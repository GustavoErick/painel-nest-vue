import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorHistory } from './entities/indicator-history.entity';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IndicatorHistory])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [TypeOrmModule, HistoryService],
})
export class HistoryModule {}
