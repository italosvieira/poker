import { Test, TestingModule } from '@nestjs/testing';
import { PokerService } from '../src/services/poker.service';
import { RankEnum } from '../src/enums/rank.enum';
import { SuitEnum } from '../src/enums/suit.enum';

describe('Four Of A Kind', (): void => {
  let pokerService: PokerService;

  beforeEach(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PokerService],
    }).compile();

    pokerService = app.get<PokerService>(PokerService);
  });

  describe('evaluate four of a kind', (): void => {
    it('should return four of a kind 1 and high card rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.TWO, suit: SuitEnum.HEARTS },
              { rank: RankEnum.TWO, suit: SuitEnum.CLUBS },
              { rank: RankEnum.TWO, suit: SuitEnum.SPADES },
              { rank: RankEnum.TWO, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.KING, suit: SuitEnum.HEARTS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.JACK, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.THREE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.SPADES },
              { rank: RankEnum.ACE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.FOUR, suit: SuitEnum.CLUBS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '2', suit: 'hearts' },
            { rank: '2', suit: 'clubs' },
            { rank: '2', suit: 'spades' },
            { rank: '2', suit: 'diamonds' },
            { rank: 'K', suit: 'hearts' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: 'J', suit: 'diamonds' },
            { rank: '3', suit: 'hearts' },
            { rank: '8', suit: 'spades' },
            { rank: 'A', suit: 'clubs' },
            { rank: '4', suit: 'clubs' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and one pair rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.FIVE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.FIVE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.FIVE, suit: SuitEnum.SPADES },
              { rank: RankEnum.FIVE, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.KING, suit: SuitEnum.CLUBS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.KING, suit: SuitEnum.HEARTS },
              { rank: RankEnum.KING, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.TWO, suit: SuitEnum.SPADES },
              { rank: RankEnum.FOUR, suit: SuitEnum.HEARTS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.CLUBS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '5', suit: 'hearts' },
            { rank: '5', suit: 'clubs' },
            { rank: '5', suit: 'spades' },
            { rank: '5', suit: 'diamonds' },
            { rank: 'K', suit: 'clubs' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: 'K', suit: 'hearts' },
            { rank: 'K', suit: 'diamonds' },
            { rank: '2', suit: 'spades' },
            { rank: '4', suit: 'hearts' },
            { rank: '7', suit: 'clubs' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and two pair rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.SIX, suit: SuitEnum.HEARTS },
              { rank: RankEnum.SIX, suit: SuitEnum.CLUBS },
              { rank: RankEnum.SIX, suit: SuitEnum.SPADES },
              { rank: RankEnum.SIX, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.THREE, suit: SuitEnum.HEARTS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.THREE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.THREE, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.ACE, suit: SuitEnum.SPADES },
              { rank: RankEnum.ACE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.HEARTS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '6', suit: 'hearts' },
            { rank: '6', suit: 'clubs' },
            { rank: '6', suit: 'spades' },
            { rank: '6', suit: 'diamonds' },
            { rank: '3', suit: 'hearts' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '3', suit: 'clubs' },
            { rank: '3', suit: 'diamonds' },
            { rank: 'A', suit: 'spades' },
            { rank: 'A', suit: 'clubs' },
            { rank: '7', suit: 'hearts' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and three of a kind rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.SEVEN, suit: SuitEnum.HEARTS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.CLUBS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.SPADES },
              { rank: RankEnum.SEVEN, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.FOUR, suit: SuitEnum.CLUBS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.JACK, suit: SuitEnum.HEARTS },
              { rank: RankEnum.JACK, suit: SuitEnum.SPADES },
              { rank: RankEnum.JACK, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.TWO, suit: SuitEnum.HEARTS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.CLUBS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '7', suit: 'hearts' },
            { rank: '7', suit: 'clubs' },
            { rank: '7', suit: 'spades' },
            { rank: '7', suit: 'diamonds' },
            { rank: '4', suit: 'clubs' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: 'J', suit: 'hearts' },
            { rank: 'J', suit: 'spades' },
            { rank: 'J', suit: 'diamonds' },
            { rank: '2', suit: 'hearts' },
            { rank: '8', suit: 'clubs' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and straight rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.NINE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.NINE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.NINE, suit: SuitEnum.SPADES },
              { rank: RankEnum.NINE, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.THREE, suit: SuitEnum.CLUBS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.FOUR, suit: SuitEnum.SPADES },
              { rank: RankEnum.FIVE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.SIX, suit: SuitEnum.CLUBS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.SPADES },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '9', suit: 'hearts' },
            { rank: '9', suit: 'clubs' },
            { rank: '9', suit: 'spades' },
            { rank: '9', suit: 'diamonds' },
            { rank: '3', suit: 'clubs' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '4', suit: 'spades' },
            { rank: '5', suit: 'hearts' },
            { rank: '6', suit: 'clubs' },
            { rank: '7', suit: 'diamonds' },
            { rank: '8', suit: 'spades' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and flush rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.QUEEN, suit: SuitEnum.HEARTS },
              { rank: RankEnum.QUEEN, suit: SuitEnum.CLUBS },
              { rank: RankEnum.QUEEN, suit: SuitEnum.SPADES },
              { rank: RankEnum.QUEEN, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.FIVE, suit: SuitEnum.HEARTS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.TWO, suit: SuitEnum.CLUBS },
              { rank: RankEnum.FIVE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.CLUBS },
              { rank: RankEnum.NINE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.KING, suit: SuitEnum.CLUBS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: 'Q', suit: 'hearts' },
            { rank: 'Q', suit: 'clubs' },
            { rank: 'Q', suit: 'spades' },
            { rank: 'Q', suit: 'diamonds' },
            { rank: '5', suit: 'hearts' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '2', suit: 'clubs' },
            { rank: '5', suit: 'clubs' },
            { rank: '7', suit: 'clubs' },
            { rank: '9', suit: 'clubs' },
            { rank: 'K', suit: 'clubs' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and full house rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.EIGHT, suit: SuitEnum.HEARTS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.CLUBS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.SPADES },
              { rank: RankEnum.EIGHT, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.TWO, suit: SuitEnum.CLUBS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.FOUR, suit: SuitEnum.HEARTS },
              { rank: RankEnum.FOUR, suit: SuitEnum.SPADES },
              { rank: RankEnum.FOUR, suit: SuitEnum.CLUBS },
              { rank: RankEnum.ACE, suit: SuitEnum.SPADES },
              { rank: RankEnum.ACE, suit: SuitEnum.HEARTS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '8', suit: 'hearts' },
            { rank: '8', suit: 'clubs' },
            { rank: '8', suit: 'spades' },
            { rank: '8', suit: 'diamonds' },
            { rank: '2', suit: 'clubs' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '4', suit: 'hearts' },
            { rank: '4', suit: 'spades' },
            { rank: '4', suit: 'clubs' },
            { rank: 'A', suit: 'spades' },
            { rank: 'A', suit: 'hearts' },
          ],
        },
      ]);
    });

    it('should return four of a kind rank 1 and four of a kind rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.EIGHT, suit: SuitEnum.HEARTS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.CLUBS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.SPADES },
              { rank: RankEnum.EIGHT, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.ACE, suit: SuitEnum.CLUBS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.NINE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.NINE, suit: SuitEnum.SPADES },
              { rank: RankEnum.NINE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.NINE, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.TWO, suit: SuitEnum.HEARTS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '9', suit: 'hearts' },
            { rank: '9', suit: 'spades' },
            { rank: '9', suit: 'clubs' },
            { rank: '9', suit: 'diamonds' },
            { rank: '2', suit: 'hearts' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '8', suit: 'hearts' },
            { rank: '8', suit: 'clubs' },
            { rank: '8', suit: 'spades' },
            { rank: '8', suit: 'diamonds' },
            { rank: 'A', suit: 'clubs' },
          ],
        },
      ]);
    });

    it('should return straight flush rank 1 and four of a kind rank 2', (): void => {
      expect(
        pokerService.evaluate([
          {
            cards: [
              { rank: RankEnum.SIX, suit: SuitEnum.HEARTS },
              { rank: RankEnum.SEVEN, suit: SuitEnum.HEARTS },
              { rank: RankEnum.EIGHT, suit: SuitEnum.HEARTS },
              { rank: RankEnum.NINE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.TEN, suit: SuitEnum.HEARTS },
            ],
          },
          {
            cards: [
              { rank: RankEnum.THREE, suit: SuitEnum.CLUBS },
              { rank: RankEnum.THREE, suit: SuitEnum.HEARTS },
              { rank: RankEnum.THREE, suit: SuitEnum.SPADES },
              { rank: RankEnum.THREE, suit: SuitEnum.DIAMONDS },
              { rank: RankEnum.JACK, suit: SuitEnum.CLUBS },
            ],
          },
        ]),
      ).toStrictEqual([
        {
          rank: 1,
          cards: [
            { rank: '6', suit: 'hearts' },
            { rank: '7', suit: 'hearts' },
            { rank: '8', suit: 'hearts' },
            { rank: '9', suit: 'hearts' },
            { rank: '10', suit: 'hearts' },
          ],
        },
        {
          rank: 2,
          cards: [
            { rank: '3', suit: 'clubs' },
            { rank: '3', suit: 'hearts' },
            { rank: '3', suit: 'spades' },
            { rank: '3', suit: 'diamonds' },
            { rank: 'J', suit: 'clubs' },
          ],
        },
      ]);
    });
  });
});
