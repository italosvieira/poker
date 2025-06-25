import { CardDto } from '../dtos/card.dto';

export interface HandWithRank {
  cards: CardDto[];
  handRank: number;
  kickerRank: number;
}
