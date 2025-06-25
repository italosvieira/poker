import { Module } from '@nestjs/common';
import { PokerController } from './controllers/poker.controller';
import { PokerService } from './services/poker.service';

@Module({
  controllers: [PokerController],
  providers: [PokerService],
})
export class MainModule {}
