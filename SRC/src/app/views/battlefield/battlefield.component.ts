import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Rounds } from 'src/app/models/enums/Rounds.enum';
import { Participant } from 'src/app/models/interfaces/Participant.interface';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';

interface Match {
  awayTeams: Participant[];
  homeTeams: Participant[];
}

interface Battles {
  roundType: string;
  matches: Match[];
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
  battles: Battles[];

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
    const { roundType, participants } = this.tournamentSwitching;

    const totalParticipantsRequired = Rounds[roundType];

    this.battles = this.buildBattlesList(totalParticipantsRequired, participants);

    if (this.battles?.length === 0) {
      this.goToLobby();
    }
  }

  /**
   * return Battles list array
   */
  buildBattlesList(totalParticipantsRequired: number, participants: Participant[]): Battles[] {
    const battles = [];
    for (let index = totalParticipantsRequired; index >= 0; index--) {
      if (!!Rounds[index]) {
        const roundType = Rounds[index];
        const matches = this.buildMatchesList(participants, roundType);
        battles.push({ roundType, matches });
      }
    }
    return battles;
  }

  /**
   * return Matches list array
   */
  buildMatchesList(participants: Participant[], roundType: string): Match[] {
    const matches: Match[] = [];
    const homeTeamsListToFirstRound = participants.filter((item, i) => i % 2 === 0);
    const awayTeamsListToFirstRound = participants.filter((item, i) => i % 2 !== 0);
    if (roundType === this.tournamentSwitching.roundType) {
      matches.push({
        homeTeams: homeTeamsListToFirstRound,
        awayTeams: awayTeamsListToFirstRound
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
}
