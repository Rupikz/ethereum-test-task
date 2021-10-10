import { ApiProperty } from '@nestjs/swagger';
import Big from 'big.js';
import { MostChangedBalanceInterface } from 'src/interfaces/most-changed-balance.interface';

export class MostChangedBalanceDto {
  @ApiProperty({
    type: 'string',
    description: 'Адрес счета, который изменился больше всего',
    example: '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b',
  })
  readonly address: string;

  @ApiProperty({
    type: 'string',
    description: 'Сумма на которую изменился счет',
    example: '7.0028',
  })
  readonly value: Big;

  constructor(data: MostChangedBalanceInterface) {
    this.address = data.address;
    this.value = data.value;
  }
}
