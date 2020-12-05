import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Rounds } from 'src/app/models/enums/Rounds.enum';
import { Participant } from 'src/app/models/interfaces/Participant.interface';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';
import { ParticipantsService } from 'src/app/services/participants.service';
import { setTournamentSwitching } from 'src/app/store/action/tournament-switching.action';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  /**
   * used to list the paticipants
   */
  participants: Participant[];

  /**
   * used to get new participant name
   */
  newParticipantName: string;

  /**
   * used in html to compare the required total of participants in a round
   */
  Rounds = Rounds;

  /**
   * used to get round type selected
   */
  roundTypeSelected = Rounds[2];

  /**
   * used to get round number of the ROUND enum
   */
  totalParticipantsRequired: number;

  constructor(
    private participantService: ParticipantsService,
    private store: Store<{ tournamentSwitching: TournamentSwitching }>,
    private route: Router
  ) {
    // get round type stored in Store
    store.subscribe((states) => {
      this.roundTypeSelected = states.tournamentSwitching.roundType || this.roundTypeSelected;
    });
  }

  ngOnInit(): void {
    this.initializeParticipantsList();

    this.updateTotalParticipantsRequired();
  }

  /**
   * push participant name in participants list using participantService.create
   */
  createParticipant(participantName: string): void {
    if (participantName?.length > 2) {
      this.participants = this.participantService.create(participantName);
      this.newParticipantName = null;
    }
    this.updateTotalParticipantsRequired();
  }

  /**
   * update a participant from participants list using participantService.update
   */
  updateParticipant(participantName: string, participantId: number): void {
    this.participants = this.participantService.update({ name: participantName, id: participantId });
    this.updateTotalParticipantsRequired();
  }

  /**
   * remove a participant from participants list using participantService.remove
   */
  removeParticipant(participant: Participant): void {
    this.participants = this.participantService.remove(participant);
    this.updateTotalParticipantsRequired();
  }

  /**
   * return rounds type list
   */
  getRoundsTypeList(): string[] {
    return Object.keys(Rounds).filter(key => !(+key));
  }

  /**
   * select round type
   */
  changeRoundType(round: string): void {
    this.roundTypeSelected = round;
    this.updateTotalParticipantsRequired();
    this.dispatchSetTournamentSwitching();
  }

  /**
   * return total paticipants miss to remove or create
   */
  totalParticipants(totalParticipantsRequired: number): number {
    return Math.abs(totalParticipantsRequired);
  }

  /**
   * change route to battlefield
   */
  goToBattle(): void {
    this.route.navigate(['battlefield']);
    this.dispatchSetTournamentSwitching();
  }

  /**
   * initializes the list of participants by getting the participant variable from the participantService
   */
  initializeParticipantsList(): void {
    this.participants = this.participantService.list();
  }

  /**
   * update total participants required to battle
   */
  updateTotalParticipantsRequired(): void {
    this.totalParticipantsRequired = this.calculateTotalParticipantsRequired(Rounds[this.roundTypeSelected]);
  }

  /**
   * calculate and return how much participants are required
   */
  calculateTotalParticipantsRequired(totalParticipantsRequired: number): number {
    return totalParticipantsRequired - this.participants.length;
  }

  /**
   * Call setTournamentSwitching action to change tournament switching state
   */
  dispatchSetTournamentSwitching(): void {
    this.store.dispatch(
      setTournamentSwitching({
        participants: this.participants,
        roundType: this.roundTypeSelected
      })
    );
  }
}
