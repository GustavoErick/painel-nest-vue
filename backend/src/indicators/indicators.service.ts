import { Injectable } from '@nestjs/common'
import { Surgery } from '../external-api/interfaces/surgery.interface'
import { Indicators } from './interfaces/indicators.interface'
import { Response } from 'express'

@Injectable()
export class IndicatorsService {
  private currentIndicators: Indicators = {
    finalized: 0,
    inProgress: 0,
    inAnesthesia: 0,
    averageDelayMinutes: 0,
    updatedAt: new Date(),
  }

  private clients: Response[] = []

  addClient(client: Response) {
    this.clients.push(client)
  }

  removeClient(client: Response) {
    this.clients = this.clients.filter((c) => c !== client)
  }

  private emitToClients() {
    const data = JSON.stringify(this.currentIndicators)
    this.clients.forEach((client) => {
      client.write(`data: ${data}\n\n`)
    })
  }

  calculate(surgeries: Surgery[]): Indicators {
    const finalized = surgeries.filter(
      (s) => s.situacao === 'RZDA' && s.dthrFimCirg !== null,
    ).length

    const inProgress = surgeries.filter(
      (s) => s.dthrInicioCirg !== null && s.dthrFimCirg === null,
    ).length

    const inAnesthesia = surgeries.filter(
      (s) => s.dthrInicioAnest !== null && s.dthrInicioCirg === null,
    ).length

    const delays = surgeries
      .filter((s) => s.dthrPrevInicio !== null && s.dthrInicioCirg !== null)
      .map((s) => {
        const prev = new Date(s.dthrPrevInicio!).getTime()
        const actual = new Date(s.dthrInicioCirg!).getTime()
        return (actual - prev) / 1000 / 60
      })
      .filter((delay) => delay > 0)

    const averageDelayMinutes =
      delays.length > 0 ? Math.round(delays.reduce((a, b) => a + b, 0) / delays.length) : 0

    this.currentIndicators = {
      finalized,
      inProgress,
      inAnesthesia,
      averageDelayMinutes,
      updatedAt: new Date(),
    }

    this.emitToClients()
    return this.currentIndicators
  }

  getCurrent(): Indicators {
    return this.currentIndicators
  }
}
