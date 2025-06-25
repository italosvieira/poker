import { CardEntity } from './card.entity';
import { RankEnum } from '../enums/rank.enum';
import { SuitEnum } from '../enums/suit.enum';
import { randomInt } from 'crypto';

export class DeckEntity {
  private readonly deck: CardEntity[] = [];

  constructor() {
    this.reset();
  }

  deal(): CardEntity {
    return this.deck[randomInt(0, this.deck.length)];
  }

  shuffle(): void {
    for (let i: number = this.deck.length - 1; i >= 1; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  reset(): void {
    this.deck.length = 0;

    for (const rank of Object.values(RankEnum)) {
      for (const suit of Object.values(SuitEnum)) {
        this.deck.push(new CardEntity(rank, suit));
      }
    }

    this.shuffle();
  }
}
