import { Module } from '@nestjs/common'
import { ExternalApiModule } from './external-api/external-api.module'
import { IndicatorsModule } from './indicators/indicators.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerModule } from './scheduler/scheduler.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule } from './redis/redis.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HistoryModule } from './history/history.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ExternalApiModule,
    IndicatorsModule,
    SchedulerModule,
    RedisModule,
    HistoryModule,
  ],
})
export class AppModule {}
