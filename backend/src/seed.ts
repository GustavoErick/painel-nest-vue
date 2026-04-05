import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IndicatorHistory } from './history/entities/indicator-history.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  console.log('Iniciando script de seed...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const repository = app.get<Repository<IndicatorHistory>>(
    getRepositoryToken(IndicatorHistory),
  );

  console.log('Limpando dados antigos...');
  await repository.query('TRUNCATE TABLE indicator_history RESTART IDENTITY CASCADE;');

  const indicators = [
    { id: 'selic', baseValue: 10.5, variation: 0.5 },
    { id: 'ipca', baseValue: 4.5, variation: 0.3 },
    { id: 'cdi', baseValue: 10.4, variation: 0.4 },
  ];

  const historyData: Partial<IndicatorHistory>[] = [];

  // Gerar dados para os últimos 30 dias
  for (let i = 30; i >= 0; i--) {
    const referenceDate = new Date();
    referenceDate.setDate(referenceDate.getDate() - i);
    referenceDate.setHours(0, 0, 0, 0);

    for (const indicator of indicators) {
      const value =
        indicator.baseValue +
        faker.number.float({ min: -indicator.variation, max: indicator.variation, fractionDigits: 2 });

      historyData.push({
        indicatorId: indicator.id,
        value,
        referenceDate,
        createdAt: new Date(),
        metadata: { source: 'seed', generatedBy: 'faker' },
      });
    }
  }

  console.log(`Inserindo ${historyData.length} registros no banco de dados...`);
  await repository.save(historyData);

  console.log('Seed realizado com sucesso!');
  await app.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('Erro ao executar o seed:', err);
  process.exit(1);
});
