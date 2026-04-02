import { Module } from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { IndicatorsController } from './indicators.controller'
import { RedisModule } from '../redis/redis.module'

@Module({
  imports: [RedisModule],
  providers: [IndicatorsService],
  controllers: [IndicatorsController],
  exports: [IndicatorsService],
})
export class IndicatorsModule {}
