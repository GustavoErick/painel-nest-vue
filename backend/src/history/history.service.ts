import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndicatorHistory } from './entities/indicator-history.entity';
import { Repository } from 'typeorm';
import { Indicators } from '../indicators/interfaces/indicators.interface'

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(IndicatorHistory)
    private readonly historyRepository: Repository<IndicatorHistory>,
  ) {}

  async findAllHistory(indicatorId?: string) {
    const query = this.historyRepository.createQueryBuilder('history')
      .orderBy('history.referenceDate', 'ASC'); // Crescente para o gráfico
      
    if (indicatorId) {
      query.where('history.indicatorId = :indicatorId', { indicatorId });
    }

    return await query.getMany();
  }

  async saveIndicators(indicators: Indicators) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const records = [
      { indicatorId: 'finalized', value: indicators.finalized },
      { indicatorId: 'inProgress', value: indicators.inProgress },
      { indicatorId: 'inAnesthesia', value: indicators.inAnesthesia },
      { indicatorId: 'averageDelayMinutes', value: indicators.averageDelayMinutes },
    ].map((r) => ({ ...r, referenceDate: today }))

    await this.historyRepository.save(records)
  }
}
