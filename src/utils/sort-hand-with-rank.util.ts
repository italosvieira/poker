import { HandWithRank } from '../interfaces/hand-with-rank.interface';

// Sort hands by highest hand rank then highest kicker rank
export function sortHandWithRank(a: HandWithRank, b: HandWithRank): -1 | 0 | 1 {
  if (a.handRankFirstPart < b.handRankFirstPart) {
    return 1;
  }

  if (a.handRankFirstPart > b.handRankFirstPart) {
    return -1;
  }

  if (a.kickerRank < b.kickerRank) {
    return 1;
  }

  if (a.kickerRank > b.kickerRank) {
    return -1;
  }

  return 0;
}
