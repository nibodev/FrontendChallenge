import { Component, OnInit } from '@angular/core';
import { Region } from '../../models/region'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  regions: Region[];
  constructor() { }

  setClasses() {
    let classes = {
      'list-region': true,
      'in-tournament': this.regions.
    }
  }

  ngOnInit(): void {
    this.regions = [
      {
        id:1,
        name:"Águas de Sentina",
        icon: "bilgewater_crest_icon.svg",
        inTournament: false
      },
      {
        id:2,
        name:"Bandópolis",
        icon: "bandle_city_crest_icon.svg",
        inTournament: false
      },
      {
        id:3,
        name:"Demacia",
        icon: "demacia_crest_icon.svg",
        inTournament: false
      },
      {
        id:4,
        name:"Freljord",
        icon: "freljord_crest_icon.svg",
        inTournament: false
      },
      {
        id:5,
        name:"Ionia",
        icon: "iona_crest_icon.svg",
        inTournament: false
      },
      {
        id:6,
        name:"Noxus",
        icon: "noxus_crest_icon.svg",
        inTournament: false
      },
      {
        id:7,
        name:"Piltover",
        icon: "piltover_crest_icon.svg",
        inTournament: false
      },
      {
        id:8,
        name:"Zaun",
        icon: "zaun_crest_icon.svg",
        inTournament: false
      }
    ]
  }

}
