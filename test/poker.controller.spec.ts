import { Test, TestingModule } from '@nestjs/testing';
import { PokerController } from '../src/controllers/poker.controller';
import { PokerService } from '../src/services/poker.service';
import { RankEnum } from '../src/enums/rank.enum';
import { SuitEnum } from '../src/enums/suit.enum';

describe('PokerController', (): void => {
  let pokerController: PokerController;

  beforeEach(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokerController],
      providers: [PokerService],
    }).compile();

    pokerController = app.get<PokerController>(PokerController);
  });

  describe('deal', (): void => {
    it('should have a length of five cards', (): void => {
      expect(pokerController.deal().cards).toHaveLength(5);
    });

    it('should have valid rank', (): void => {
      const validRanks: RankEnum[] = Object.values(RankEnum);

      for (const card of pokerController.deal().cards) {
        expect(card.rank).toBeDefined();
        expect(validRanks.includes(card.rank)).toBe(true);
      }
    });

    it('should have valid suit', (): void => {
      const validSuits: SuitEnum[] = Object.values(SuitEnum);

      for (const card of pokerController.deal().cards) {
        expect(card.suit).toBeDefined();
        expect(validSuits.includes(card.suit)).toBe(true);
      }
    });
  });

  describe('evaluate', (): void => {
    it('should return empty array on empty input', (): void => {
      expect(pokerController.evaluate([])).toStrictEqual([]);
    });
  });
});
