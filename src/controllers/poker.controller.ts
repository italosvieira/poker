import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { PokerService } from '../services/poker.service';
import { HandDto } from '../dtos/hand.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('/poker')
export class PokerController {
  constructor(private readonly pokerService: PokerService) {}

  @Get('/deal')
  @ApiOkResponse({
    type: HandDto,
    description:
      'Returns a poker hand with five cards. Each card has a rank and suit',
  })
  deal(): HandDto {
    return this.pokerService.deal();
  }

  @Post('/evaluate')
  @ApiBody({ type: [HandDto] })
  @ApiOkResponse({
    type: [HandDto],
    description: 'Evaluates an array of poker hands and returns the output', // TODO
  })
  evaluate(
    @Body(new ParseArrayPipe({ items: HandDto })) hands: HandDto[],
  ): any {
    return this.pokerService.evaluate(hands);
  }
}
