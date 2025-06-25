import { RankEnum } from '../enums/rank.enum';

export function getRankValue(rank: RankEnum): number {
  switch (rank) {
    case RankEnum.TWO:
      return 2;
    case RankEnum.THREE:
      return 3;
    case RankEnum.FOUR:
      return 4;
    case RankEnum.FIVE:
      return 5;
    case RankEnum.SIX:
      return 6;
    case RankEnum.SEVEN:
      return 7;
    case RankEnum.EIGHT:
      return 8;
    case RankEnum.NINE:
      return 9;
    case RankEnum.TEN:
      return 10;
    case RankEnum.JACK:
      return 11;
    case RankEnum.QUEEN:
      return 12;
    case RankEnum.KING:
      return 13;
    case RankEnum.ACE:
      return 14;
  }
}
