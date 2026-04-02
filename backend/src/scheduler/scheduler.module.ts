import { Module } from '@nestjs/common'
import { SchedulerService } from './scheduler.service'
import { ExternalApiModule } from '../external-api/external-api.module'
import { IndicatorsModule } from '../indicators/indicators.module'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [ExternalApiModule, IndicatorsModule, RedisModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
