import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ExternalApiService } from './external-api.service'

@Module({
  imports: [HttpModule],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
