import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('indicator_history')
export class IndicatorHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'indicator_id' })
  indicatorId: string; // To match whatever ID we use (e.g., ibge, bcb, selic, etc.)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any; // E.g., period, source, detailed info

  @Column({ type: 'date', nullable: true })
  referenceDate: Date; // The date this value actually refers to

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
