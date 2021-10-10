import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import Big from 'big.js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MostChangedBalanceDto } from './dtos/most-changed-balance.dto';
import configuration from './shared/configuration';
import { ConfigurationService } from './shared/configuration.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
          expandVariables: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService, ConfigurationService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    jest.setTimeout(240000);
    it('Проверка типа ответа', async () => {
      const result = await appController.mostChangedBalance();
      expect(result).toBeInstanceOf(MostChangedBalanceDto);
      expect(result.value).toBeInstanceOf(Big);
      expect(typeof result.address).toBe('string');
    });
  });
});
