import { Controller, MessageEvent, Sse } from '@nestjs/common'
import { concat, defer, from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { IndicatorsService } from './indicators.service'
import { RedisService } from 'src/redis/redis.service'

@Controller('indicators')
export class IndicatorsController {
  constructor(
    private readonly indicatorsService: IndicatorsService,
    private readonly redisService: RedisService,
  ) {}

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    const initialState$ = defer(() => from(this.redisService.getIndicators())).pipe(
      map((cached) => ({
        data: cached ?? this.indicatorsService.getCurrent(),
      })),
      catchError(() =>
        of({
          data: this.indicatorsService.getCurrent(),
        }),
      ),
    )

    return concat(initialState$, this.indicatorsService.stream())
  }
}
