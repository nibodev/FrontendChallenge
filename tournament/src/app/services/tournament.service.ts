import { Injectable, EventEmitter } from '@angular/core';

import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})

export class TournamentService {
  static selectedRegion = new EventEmitter();
  //private
  regions: Region[] = [
    {
      id:1,
      name:"Águas de Sentina",
      icon: "bilgewater_crest_icon.png",
      inTournament: false
    },
    {
      id:2,
      name:"Bandópolis",
      icon: "bandle_city_crest_icon.png",
      inTournament: false
    },
    {
      id:3,
      name:"Demacia",
      icon: "demacia_crest_icon.png",
      inTournament: false
    },
    {
      id:4,
      name:"Freljord",
      icon: "freljord_crest_icon.png",
      inTournament: false
    },
    {
      id:5,
      name:"Ionia",
      icon: "iona_crest_icon.png",
      inTournament: false
    },
    {
      id:6,
      name:"Noxus",
      icon: "noxus_crest_icon.png",
      inTournament: false
    },
    {
      id:7,
      name:"Piltover",
      icon: "piltover_crest_icon.png",
      inTournament: false
    },
    {
      id:8,
      name:"Zaun",
      icon: "zaun_crest_icon.png",
      inTournament: false
    }
  ]

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

  constructor() { 
    console.log('TournamentService')
  }

  // :Observable<Region[]>?
  getRegions() {
    return this.regions;
  }

  addSelectedRegion(region: Region) {
    const emptyPosition = Object.keys(this.selected).find(position => this.selected[position] === null);
    if(emptyPosition !== undefined){
      this.selected = {...this.selected, [emptyPosition]: region}
      TournamentService.selectedRegion.emit(this.selected);
    }
  }
}
