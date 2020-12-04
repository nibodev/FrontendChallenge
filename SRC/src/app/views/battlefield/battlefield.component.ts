import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Rounds } from 'src/app/models/enums/Rounds.enum';
import { Participant } from 'src/app/models/interfaces/Participant.interface';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';

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
   * used to get round list
   */
  roundList: any[];

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

    const totalRequired = Rounds[roundType];

    this.roundList = this.getRoundsList(totalRequired, participants);

    if (this.roundList?.length === 0) {
      this.router.navigate(['lobby']);
    }
  }

  /**
   * build round list array with RoundType, HomeTeamsList and AwayTeamsList
   */
  getRoundsList(totalRequired: number, participants: Participant[]): any[] {
    const roundList = [];
    for (let index = totalRequired; index >= 0; index--) {
      if (!!Rounds[index]) {
        const roundType = Rounds[index];
        const homeTeamsList = participants.filter((item, i) => i % 2 === 0);
        const awayTeamsList = participants.filter((item, i) => i % 2 !== 0);
        roundList.push({roundType, homeTeamsList, awayTeamsList});
      }
    }
    return roundList;
  }
}
