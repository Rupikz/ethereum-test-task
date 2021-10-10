import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MostChangedBalanceInterface } from './interfaces/most-changed-balance.interface';
import { ResponseInterface } from './interfaces/response.interface';
import { TransactionInterface } from './interfaces/transaction.interface';
import { ConfigurationService } from './shared/configuration.service';

@Injectable()
export class AppService {
  public blockCount = 100;
  private apiKey: string;
  private apiUrl: string;

  constructor(private configurationService: ConfigurationService) {
    this.apiKey = this.configurationService.etherscanApiKey;
    this.apiUrl = this.configurationService.etherscanApiUrl;
  }

  async getRecentBlockNumber(): Promise<string> {
    const response: ResponseInterface = await axios({
      method: 'GET',
      url: `${this.apiUrl}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`,
    });
    const result = response.data.result;
    if (response.data.status === '0') {
      throw new ForbiddenException(result);
    }
    return result;
  }

  async getTransactionsByBlockNumber(
    blockNumber: string,
  ): Promise<TransactionInterface[]> {
    const response: ResponseInterface = await axios({
      method: 'GET',
      url: `${this.apiUrl}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${this.apiKey}`,
    });
    const result = response.data.result;
    if (response.data.status === '0') {
      throw new ForbiddenException(result);
    }
    return result.transactions;
  }

  async mostChangedBalance(): Promise<MostChangedBalanceInterface> {
    const amountTransactionMap = new Map<string, number>();

    for (let i = 0; i < this.blockCount; i++) {
      const currentBlockNumber = await this.getRecentBlockNumber();
      const currentTransactions = await this.getTransactionsByBlockNumber(
        currentBlockNumber,
      );
      for (let j = 0; j < currentTransactions.length; j++) {
        const amountTransaction = parseFloat(
          currentTransactions[j].value
            .split('x')
            .map((it) => parseInt(it, 16))
            .join('.'),
        );

        const from = currentTransactions[j].from;
        const to = currentTransactions[j].to;
        if (!amountTransactionMap.has(from)) {
          amountTransactionMap.set(from, -amountTransaction);
        } else {
          const currentAmountTransaction = amountTransactionMap.get(from);
          amountTransactionMap.set(
            from,
            currentAmountTransaction - amountTransaction,
          );
        }
        if (!amountTransactionMap.has(to)) {
          amountTransactionMap.set(to, amountTransaction);
        } else {
          const currentAmountTransaction = amountTransactionMap.get(to);
          amountTransactionMap.set(
            to,
            currentAmountTransaction + amountTransaction,
          );
        }
      }
    }

    const [address, balance] = [...amountTransactionMap.entries()]
      .map((it) => {
        it[1] = Math.abs(it[1]);
        return it;
      })
      .reduce((acc, it) => (it[1] > acc[1] ? it : acc));

    return {
      value: balance,
      address,
    };
  }
}
