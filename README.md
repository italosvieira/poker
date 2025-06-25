## Poker API

Poker api using nestjs. Application is using por 3000.

For swagger go to http://localhost:3000/docs

/poker/deal = Logic here is to deal a valid poker hand with 5 no repeated cards. There is no deck exhaustion, no
memorization of previous hands. Just a "dumb" create poker hand endpoint.

/poker/evaluate = Logic here is to evaluate each hand and give the hand a rank. The input validation is just valid array
of valid objects with valid card ranks and suits. One extra validation is no repeated cards. If there is a tie the hands
will have the same rank.

All tests in test folder. Trying to add one file for each type of hand comparing with each other type of hand.

## Project setup

```bash
$ npm ci
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Using Docker Compose

```bash
$ docker compose up
```