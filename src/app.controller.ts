import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MostChangedBalanceDto } from './dtos/most-changed-balance.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Адрес, баланс которого изменился больше остальных',
  })
  @ApiOkResponse({ type: MostChangedBalanceDto })
  @Get('balance-changed-more')
  async mostChangedBalance(): Promise<MostChangedBalanceDto> {
    const result = await this.appService.mostChangedBalance();
    return new MostChangedBalanceDto(result);
  }
}
