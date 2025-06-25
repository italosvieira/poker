import { ApiProperty } from '@nestjs/swagger';
import { RankEnum } from '../enums/rank.enum';
import { SuitEnum } from '../enums/suit.enum';
import { IsDefined, IsEnum } from 'class-validator';

export class CardDto {
  @ApiProperty({
    example: RankEnum.ACE,
    description: 'The rank of the card',
    enum: RankEnum,
    required: true,
  })
  @IsDefined()
  @IsEnum(RankEnum)
  rank: RankEnum;

  @ApiProperty({
    example: SuitEnum.CLUBS,
    description: 'The suit of the card',
    enum: SuitEnum,
    required: true,
  })
  @IsDefined()
  @IsEnum(SuitEnum)
  suit: SuitEnum;
}
