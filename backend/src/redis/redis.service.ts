import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { Indicators } from '../indicators/interfaces/indicators.interface'

const INDICATORS_KEY = 'indicators:latest'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name)
  private client: Redis

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL', '')
    this.logger.log(`Conectando ao Redis em: ${redisUrl}`)
    this.client = new Redis(redisUrl)
    this.client.on('connect', () => this.logger.log('Redis conectado'))
    this.client.on('error', (err) => this.logger.error('Erro no Redis', err))
  }

  async onModuleDestroy() {
    await this.client.quit()
  }

  async saveIndicators(indicators: Indicators): Promise<void> {
    await this.client.set(INDICATORS_KEY, JSON.stringify(indicators))
  }

  async getIndicators(): Promise<Indicators | null> {
    const data = await this.client.get(INDICATORS_KEY)
    return data ? (JSON.parse(data) as Indicators) : null
  }
}
