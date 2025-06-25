import { RankEnum } from '../enums/rank.enum';
import { SuitEnum } from '../enums/suit.enum';

export class CardEntity {
  constructor(rank: RankEnum, suit: SuitEnum) {
    this.rank = rank;
    this.suit = suit;
  }

  rank: RankEnum;
  suit: SuitEnum;
}
