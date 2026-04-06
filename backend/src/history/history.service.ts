import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IndicatorHistory } from './entities/indicator-history.entity'
import { Repository } from 'typeorm'
import { Indicators } from '../indicators/interfaces/indicators.interface'

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(IndicatorHistory)
    private readonly historyRepository: Repository<IndicatorHistory>,
  ) {}

  async findAllHistory() {
    const data = await this.historyRepository
      .createQueryBuilder('history')
      .orderBy('history.referenceDate', 'ASC')
      .getMany()

    const grouped = {}

    for (const item of data) {
  const rawDate = item.referenceDate

  const dateObj = rawDate instanceof Date
    ? rawDate
    : new Date(String(rawDate) + 'T00:00:00')

  if (isNaN(dateObj.getTime())) {
    console.log('Data inválida:', rawDate)
    continue
  }

  const date = dateObj.toISOString().split('T')[0]

  if (!grouped[date]) {
    grouped[date] = {
      date,
      finalized: 0,
      inProgress: 0,
      inAnesthesia: 0,
      averageDelayMinutes: 0,
    }
  }

  grouped[date][item.indicatorId] = Number(item.value)
}
    return Object.values(grouped)
  }

  async saveIndicators(indicators: Indicators) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const entries = [
      { indicatorId: 'finalized', value: indicators.finalized },
      { indicatorId: 'inProgress', value: indicators.inProgress },
      { indicatorId: 'inAnesthesia', value: indicators.inAnesthesia },
      { indicatorId: 'averageDelayMinutes', value: indicators.averageDelayMinutes },
    ]

    for (const entry of entries) {
      await this.historyRepository.upsert({ ...entry, referenceDate: today }, [
        'indicatorId',
        'referenceDate',
      ])
    }
  }
}
