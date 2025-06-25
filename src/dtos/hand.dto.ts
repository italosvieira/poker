import { ApiProperty } from '@nestjs/swagger';
import { CardDto } from './card.dto';
import { RankEnum } from '../enums/rank.enum';
import { SuitEnum } from '../enums/suit.enum';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HandDto {
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
  @IsDefined()
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards: CardDto[];
}
