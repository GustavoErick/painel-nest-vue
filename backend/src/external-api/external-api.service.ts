import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { Surgery } from './interfaces/surgery.interface'

@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchTodaySurgeries(): Promise<Surgery[]> {
    const today = new Date()
      .toLocaleDateString('pt-BR', {
        timeZone: 'America/Fortaleza',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .reverse()
      .join('-')

    const url = this.configService.get<string>('API_URL', '')
    const token = this.configService.get<string>('API_TOKEN', '')
    const filial = this.configService.get<string>('API_FILIAL', '')

    try {
      const { data } = await firstValueFrom(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.httpService.get<Surgery[]>(url, {
          params: {
            filial,
            dataInicial: today,
            dataFinal: today,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      )

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data
    } catch (error) {
      this.logger.error('Erro ao buscar cirurgias da API externa', error)
      return []
    }
  }
}
