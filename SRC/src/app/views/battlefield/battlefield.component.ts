import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Rounds } from 'src/app/models/enums/Rounds.enum';
import { Participant } from 'src/app/models/interfaces/Participant.interface';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';

interface Match {
  awayParticipant: Participant;
  homeParticipant: Participant;
}

interface Battle {
  roundType: string;
  participants: Participant[];
  matches: Match[];
  winners: Participant[];
}

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {
  /**
   * used to get Tournament Switching
   */
  tournamentSwitching: TournamentSwitching;

  /**
   * used to get roundType list
   */
  battles: Battle[];

  constructor(
    private store: Store<{ tournamentSwitching: TournamentSwitching }>,
    private router: Router
  ) {
    // get tournament switching stored in store
    store.select('tournamentSwitching').subscribe((state) => {
      this.tournamentSwitching = state;
    });
  }

  ngOnInit(): void {
    const { participants } = this.tournamentSwitching;

    this.battles = this.buildBattlesList(participants);

    if (this.battles?.length === 0) {
      this.goToLobby();
    }
  }

  /**
   * Build the battles by participants registered
   */
  buildBattlesList(participants: Participant[]): Battle[] {
    const battles = [];
    for (let index = participants.length; index >= 2; index = index / 2) {

      const roundType = Rounds[index];

      if (index === participants.length) {
        const matches = this.buildMatchesList(participants);

        battles.push({ roundType, participants, matches, winners: []});
      } else {
        battles.push({ roundType, participants: [], matches: [], winners: []});
      }
    }
    return battles;
  }

  /**
   * Build the matches of a battle
   */
  buildMatchesList(participants: Participant[]): Match[] {
    const matches: Match[] = [];
    const homeTeams = participants.filter((item, index) => index % 2 === 0);
    const awayTeams = participants.filter((item, index) => index % 2 !== 0);
    for (let index = 0; index < participants.length / 2; index ++) {
      matches.push({
        awayParticipant: awayTeams[index],
        homeParticipant: homeTeams[index]
      });
    }
    return matches;
  }

  /**
   * change route to lobby
   */
  goToLobby(): void {
    this.router.navigate(['lobby']);
  }

  /**
   * selects the winning participants of a match in a battle
   */
  selectWinnerParticipant(participant: Participant, battle: Battle): void {
    battle.winners.push(participant);
    if (Rounds[battle.roundType] === Rounds.FINAL) {
      alert(`${participant.name} is the champion`);
    } else {
      if (battle.winners.length === battle.participants.length / 2) {
        const nextRoundType = Rounds[battle.winners.length];
        const nextBattle = this.battles.find(b => b.roundType === nextRoundType);
        nextBattle.participants = battle.winners;
        nextBattle.matches = this.buildMatchesList(nextBattle.participants);
      }
    }
  }

  /**
   * verify that the participant has won a match in a battle
   */
  isParticipantWinner(participant: Participant, battle: Battle): boolean {
    return !!battle.winners.find(item => item.id === participant.id);
  }
}
