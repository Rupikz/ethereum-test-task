# ТЗ backend (node)

## Описание

У etherscan.io есть API, позволяющий получить информацию о транзакциях в блоке в сети ethereum, по номеру блока:

```
https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true
```

Где **_tag_** - номер блока в 16 системе

В этом методе, помимо прочего, возвращается список транзакций в блоке для каждой транзакции описаны:

- Адрес отправителя: **result.transactions[].from**
- Адрес получателя: **result.transactions[].to**
- Сумма: **result.transactions[].value**

Есть метод, который возвращает номер последнего блока в сети:

```
https://api.etherscan.io/api?module=proxy&action=eth_blockNumber
```

## Задача

Написать апи-сервис, с ендпоинтом, который выдаст адрес баланс которого изменился больше остальных (по абсолютной величине) за последние 100 блоков.

## Запуск

1. Переименовать файл **.example.env** в **.env**
2. Указать свой апи-ключ от EtherscanApi в **API_ETHERSCAN_KEY**
3. Установить зависимости проекта командой `yarn`
4. Запустить проект командой `yarn start`
