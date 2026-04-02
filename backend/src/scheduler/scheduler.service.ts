import { Injectable, Logger } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { ExternalApiService } from '../external-api/external-api.service'
import { IndicatorsService } from '../indicators/indicators.service'
import { RedisService } from '../redis/redis.service'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  constructor(
    private readonly externalApiService: ExternalApiService,
    private readonly indicatorsService: IndicatorsService,
    private readonly redisService: RedisService,
  ) {}

  @Interval(2000)
  async fetchAndCalculate() {
    this.logger.debug('Buscando cirurgias...')

    const surgeries = await this.externalApiService.fetchTodaySurgeries()
    const indicators = this.indicatorsService.calculate(surgeries)
    
    await this.redisService.saveIndicators(indicators)

    this.logger.debug(`Indicadores calculados: ${JSON.stringify(indicators)}`)
  }
}
