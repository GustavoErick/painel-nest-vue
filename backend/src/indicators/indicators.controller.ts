import { Controller, Res, Sse } from '@nestjs/common'
import type { Response } from 'express'
import { IndicatorsService } from './indicators.service'

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Sse('stream')
  stream(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const current = this.indicatorsService.getCurrent()
    res.write(`data: ${JSON.stringify(current)}\n\n`)

    this.indicatorsService.addClient(res)

    res.on('close', () => {
      this.indicatorsService.removeClient(res)
    })
  }
}
