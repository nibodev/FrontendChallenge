import { Component, OnInit, Input } from '@angular/core';
import { Region } from 'src/app/models/region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  @Input() region: Region;
  
  constructor() { }

  ngOnInit(): void {
  }

}
