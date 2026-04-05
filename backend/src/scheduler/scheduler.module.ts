import { Module } from '@nestjs/common'
import { SchedulerService } from './scheduler.service'
import { ExternalApiModule } from '../external-api/external-api.module'
import { IndicatorsModule } from '../indicators/indicators.module'
import { RedisModule } from 'src/redis/redis.module'
import { HistoryModule } from '../history/history.module'

@Module({
  imports: [ExternalApiModule, IndicatorsModule, RedisModule, HistoryModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
