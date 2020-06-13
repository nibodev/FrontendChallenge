import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../../services/tournament.service';
import { Region } from '../../models/region';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  regions: Region[] = [];
  constructor(private tournamentService: TournamentService) {
    TournamentService.updateRegions.subscribe(
      regions => this.regions = regions
    );
  }

  ngOnInit(): void {
    this.regions = this.tournamentService.getRegions();
  }

  addRegion(region: Region) {
    this.tournamentService.addSelectedRegion(region);
  }

}
