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
  // tournamentService: TournamentService
  constructor(private tournamentService: TournamentService) {
    // this.tournamentService = _tournamentService;
  }

  // setClasses() {
  //   let classes = {
  //     'list-region': true,
  //     'in-tournament': this.regions.
  //   }
  // }

  ngOnInit(): void {
    this.regions = this.tournamentService.getRegions();
  }

}
