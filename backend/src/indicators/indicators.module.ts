import { Module } from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { IndicatorsController } from './indicators.controller'

@Module({
  providers: [IndicatorsService],
  controllers: [IndicatorsController],
  exports: [IndicatorsService],
})
export class IndicatorsModule {}
