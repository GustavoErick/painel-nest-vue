import { Module } from '@nestjs/common'
import { SchedulerService } from './scheduler.service'
import { ExternalApiModule } from '../external-api/external-api.module'
import { IndicatorsModule } from '../indicators/indicators.module'

@Module({
  imports: [ExternalApiModule, IndicatorsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
