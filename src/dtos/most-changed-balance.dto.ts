import { ApiProperty } from '@nestjs/swagger';
import { MostChangedBalanceInterface } from 'src/interfaces/most-changed-balance.interface';

export class MostChangedBalanceDto {
  @ApiProperty({ type: 'string' })
  readonly address: string;

  @ApiProperty({ type: 'integer' })
  readonly value: number;

  constructor(data: MostChangedBalanceInterface) {
    this.address = data.address;
    this.value = data.value;
  }
}
