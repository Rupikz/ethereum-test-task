import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get etherscanApiKey(): string {
    return this.configService.get('api.etherscan.key');
  }

  get etherscanApiUrl(): string {
    return this.configService.get('api.etherscan.url');
  }
  get port(): string {
    return this.configService.get('app.port');
  }
}
