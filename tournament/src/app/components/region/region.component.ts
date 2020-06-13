import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';

import { TournamentService } from '../../services/tournament.service';
import { Region } from '../../models/region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  @Input() region: Region;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
  }

  onSelect(region: Region) {
    this.tournamentService.addSelectedRegion(region);
  }

}
