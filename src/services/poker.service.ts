import { BadRequestException, Injectable } from '@nestjs/common';
import { DeckEntity } from '../entities/deck.entity';
import { HandDto } from '../dtos/hand.dto';
import { CardEntity } from '../entities/card.entity';
import { CardDto } from '../dtos/card.dto';
import { HandWithRank } from '../interfaces/hand-with-rank.interface';
import { sortHandWithRank } from '../utils/sort-hand-with-rank.util';
import { getRankValue } from '../utils/get-rank-value.util';
import { RANK_ORDER } from '../utils/rank-order.util';

@Injectable()
export class PokerService {
  private readonly deck: DeckEntity = new DeckEntity();

  public deal(): HandDto {
    // Using a map to create the cards array so we don't get duplicated cards in the hand
    const cardsMap = new Map<string, CardEntity>();

    while (cardsMap.size < 5) {
      const card: CardEntity = this.deck.deal();
      cardsMap.set(`${card.rank}${card.suit}`, card);
    }

    return {
      cards: Array.from(cardsMap.values()),
    };
  }

  // My logic here was tro group the type of hands
  // Then sort the hands withing the groups
  // Then flat all the groups in an ordered array and add the rank of each hand
  public evaluate(hands: HandDto[]): any {
    const evaluatedCards = new Set<string>();
    const handsGroupedByRank = new Map<number, HandWithRank[]>([
      [1, []], // Straight Flush
      [2, []], // Four Of A Kind
      [3, []], // Full House
      [4, []], // Flush
      [5, []], // Straight
      [6, []], // Three Of A Kind
      [7, []], // Two Pair
      [8, []], // One Pair
      [9, []], // High Card
    ]);

    for (const hand of hands) {
      const handSuits = new Set<string>();
      const cardsGroupedByRank = new Map<string, CardDto[]>();

      // Group the cards of each hand to check the type of hand
      for (const card of hand.cards) {
        this.checkForRepeatedCard(card, evaluatedCards);

        const cardsGrouped: CardDto[] | undefined = cardsGroupedByRank.get(
          card.rank,
        );

        if (cardsGrouped) {
          cardsGrouped.push(card);
        } else {
          cardsGroupedByRank.set(card.rank, [card]);
        }

        handSuits.add(card.suit);
      }

      // With the type of hand defined
      // Calculate the hand rank and
      // Add each hand to the ordered type of hand array
      switch (cardsGroupedByRank.size) {
        case 5: // if 5 = high card, straight, flush, straight flush
          this.calculateHandWithRank5(
            cardsGroupedByRank,
            handsGroupedByRank,
            hand.cards,
            handSuits,
          );
          break;
        case 4: // if 4 = one pair
          this.calculateHandWithRank4(
            cardsGroupedByRank,
            handsGroupedByRank,
            hand.cards,
          );
          break;
        case 3: // if 3 = two pair, three of a kind
          this.calculateHandWithRank3(
            cardsGroupedByRank,
            handsGroupedByRank,
            hand.cards,
          );
          break;
        case 2: // if 2 = four of a kind, full house,
          this.calculateHandWithRank2(
            cardsGroupedByRank,
            handsGroupedByRank,
            hand.cards,
          );
          break;
      }
    }

    // Sort each hand group, the flat them and add ranks to hands
    let rank: number = 0;
    let lastHandWithRank: HandWithRank | null = null;

    const finalArray: any[] = [];

    for (const handsWithRankGrouped of Array.from(
      handsGroupedByRank.values(),
    )) {
      for (const handWithRank of handsWithRankGrouped.sort(sortHandWithRank)) {
        if (
          !lastHandWithRank ||
          (handWithRank.handRank !== lastHandWithRank.handRank &&
            handWithRank.kickerRank !== lastHandWithRank.kickerRank)
        ) {
          rank++;
        }

        lastHandWithRank = handWithRank;
        finalArray.push({ rank, cards: handWithRank.cards });
      }

      lastHandWithRank = null;
    }

    return finalArray;
  }

  private checkForRepeatedCard(
    card: CardDto,
    evaluatedCards: Set<string>,
  ): void {
    const cardHash: string = `${card.rank}${card.suit}`;

    // if there is a repeated card it's a bust
    if (evaluatedCards.has(cardHash)) {
      throw new BadRequestException(`Duplicated card. Card: ${cardHash}`);
    }

    evaluatedCards.add(cardHash);
  }

  private calculateHandWithRank2(
    cardsGroupedByRank: Map<string, CardDto[]>,
    handsGroupedByRank: Map<number, HandWithRank[]>,
    cards: CardDto[],
  ): void {
    let handRankSize: number;
    let kickerRankSize: number;
    let handWithRanks: HandWithRank[];

    const cardsGrouped: CardDto[][] = Array.from(cardsGroupedByRank.values());

    if (cardsGrouped[0].length === 4 || cardsGrouped[1].length === 4) {
      // Four of a kind 2
      handWithRanks = handsGroupedByRank.get(2)!;
      handRankSize = 4;
      kickerRankSize = 1;
    } else {
      // Full house 3
      handWithRanks = handsGroupedByRank.get(3)!;
      handRankSize = 3;
      kickerRankSize = 2;
    }

    handWithRanks.push({
      cards,
      handRank: cardsGrouped
        .find((cards: CardDto[]): boolean => cards.length === handRankSize)!
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
      kickerRank: cardsGrouped
        .find((cards: CardDto[]): boolean => cards.length === kickerRankSize)!
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
    });
  }

  private calculateHandWithRank3(
    cardsGroupedByRank: Map<string, CardDto[]>,
    handsGroupedByRank: Map<number, HandWithRank[]>,
    cards: CardDto[],
  ): void {
    let handRankSize: number;
    let kickerRankSize: number;
    let handWithRanks: HandWithRank[];

    const cardsGrouped: CardDto[][] = Array.from(cardsGroupedByRank.values());

    if (
      cardsGrouped[0].length === 3 ||
      cardsGrouped[1].length === 3 ||
      cardsGrouped[2].length === 3
    ) {
      // three of a kind
      handWithRanks = handsGroupedByRank.get(6)!;
      handRankSize = 3;
      kickerRankSize = 1;
    } else {
      // two pair
      handWithRanks = handsGroupedByRank.get(7)!;
      handRankSize = 2;
      kickerRankSize = 1;
    }

    handWithRanks.push({
      cards,
      handRank: cardsGrouped
        .filter((cards: CardDto[]): boolean => cards.length === handRankSize)
        .flat()
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
      kickerRank: cardsGrouped
        .filter((cards: CardDto[]): boolean => cards.length === kickerRankSize)
        .flat()
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
    });
  }

  private calculateHandWithRank4(
    cardsGroupedByRank: Map<string, CardDto[]>,
    handsGroupedByRank: Map<number, HandWithRank[]>,
    cards: CardDto[],
  ): void {
    const cardsGrouped: CardDto[][] = Array.from(cardsGroupedByRank.values());

    handsGroupedByRank.get(8)!.push({
      cards,
      handRank: cardsGrouped
        .filter((cards: CardDto[]): boolean => cards.length === 2)
        .flat()
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
      kickerRank: cardsGrouped
        .filter((cards: CardDto[]): boolean => cards.length === 1)
        .flat()
        .reduce(
          (accumulator: number, currentValue: CardDto): number =>
            accumulator + getRankValue(currentValue.rank),
          0,
        ),
    });
  }

  private calculateHandWithRank5(
    cardsGroupedByRank: Map<string, CardDto[]>,
    handsGroupedByRank: Map<number, HandWithRank[]>,
    cards: CardDto[],
    handSuits: Set<string>,
  ): void {
    const cardsGrouped: CardDto[] = Array.from(cardsGroupedByRank.values())
      .flat()
      .sort((a: CardDto, b: CardDto): number => {
        return RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank);
      });

    let handWithRanks: HandWithRank[];
    const isFlush: boolean = handSuits.size === 1;
    const isStraight: boolean = [
      'A2345',
      '23456',
      '34567',
      '45678',
      '56789',
      '678910',
      '78910J',
      '8910JQ',
      '910JQK',
      '10JQKA',
    ].includes(
      cardsGrouped.reduce(
        (accumulator: string, currentValue: CardDto): string =>
          accumulator + currentValue.rank,
        '',
      ),
    );

    if (isFlush && isStraight) {
      // straight flush = 1
      handWithRanks = handsGroupedByRank.get(1)!;
    } else if (isFlush) {
      // flush = 4
      handWithRanks = handsGroupedByRank.get(4)!;
    } else if (isStraight) {
      // straight = 5
      handWithRanks = handsGroupedByRank.get(5)!;
    } else {
      // high card = 9
      handWithRanks = handsGroupedByRank.get(9)!;
    }

    handWithRanks.push({
      cards,
      handRank: cardsGrouped.reduce(
        (accumulator: number, currentValue: CardDto): number =>
          accumulator + getRankValue(currentValue.rank),
        0,
      ),
      kickerRank: 0,
    });
  }
}
