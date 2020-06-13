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
  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    // this.tournamentService.getRegions().subscribe(
    //   regions => this.regions = regions
    // );
    this.regions = this.tournamentService.getRegions();
  }

  addRegion(region: Region) {
    this.tournamentService.addSelectedRegion(region);
  }

}
