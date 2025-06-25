import { CardDto } from '../dtos/card.dto';

export interface HandWithRank {
  cards: CardDto[];
  handRankFirstPart: number;
  handRankSecondPart: number;
  kickerRank: number;
}
