import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorHistory } from './entities/indicator-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicatorHistory])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class HistoryModule {}
