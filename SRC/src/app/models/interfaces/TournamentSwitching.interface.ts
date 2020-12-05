import { Participant } from './Participant.interface';

export interface TournamentSwitching {
  participants: Participant[];
  initialRoundType: string;
}
