import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../../services/tournament.service';
import { Region } from '../../models/region';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent implements OnInit {
  selected: { 
    1: Region|null, 
    2: Region|null, 
    3: Region|null, 
    4: Region|null 
  } = {
    1: null,
    2: null,
    3: null, 
    4: null
  };

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    TournamentService.selectedRegion.subscribe(
      selected => this.selected = selected
    );
  }

  onRemove(selected, position){
    this.tournamentService.removeSelectedRegion(selected, position);
  }
}
