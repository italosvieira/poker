import { ApiProperty } from '@nestjs/swagger';
import { CardDto } from './card.dto';
import { RankEnum } from '../enums/rank.enum';
import { SuitEnum } from '../enums/suit.enum';

export class HandWithRankDto {
  @ApiProperty({
    example: 1,
    description: 'The rank of the hand',
    type: 'number',
    required: true,
  })
  rank: number;

  @ApiProperty({
    example: [
      { rank: RankEnum.ACE, suit: SuitEnum.CLUBS },
      { rank: RankEnum.TWO, suit: SuitEnum.HEARTS },
      { rank: RankEnum.FIVE, suit: SuitEnum.SPADES },
      { rank: RankEnum.SEVEN, suit: SuitEnum.DIAMONDS },
      { rank: RankEnum.EIGHT, suit: SuitEnum.CLUBS },
    ],
    description: 'The cards array that represents a poker hand',
    type: CardDto,
    required: true,
  })
  cards: CardDto[];
}
