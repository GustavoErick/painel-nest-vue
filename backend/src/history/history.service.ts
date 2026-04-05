import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndicatorHistory } from './entities/indicator-history.entity';
import { Repository } from 'typeorm';

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
}
