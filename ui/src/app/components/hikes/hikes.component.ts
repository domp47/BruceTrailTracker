import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-hikes',
  templateUrl: './hikes.component.html',
  styleUrls: ['./hikes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HikesComponent implements OnInit {

  dataSource = [1, 2, 3];
  columnsToDisplay = ['name', 'startTime', 'endTime', 'startCoord', 'endCoord'];
  expandedElement: any | null;

  constructor() { }

  ngOnInit(): void {
  }

}
