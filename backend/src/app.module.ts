import { Module } from '@nestjs/common'
import { ExternalApiModule } from './external-api/external-api.module'
import { IndicatorsModule } from './indicators/indicators.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerModule } from './scheduler/scheduler.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ExternalApiModule,
    IndicatorsModule,
    SchedulerModule,
  ],
})
export class AppModule {}
