import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as olProj from 'ol/proj';
import PolyLine from 'ol/format/Polyline';
import VectorSource from 'ol/source/Vector';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { HikeService } from 'src/app/services/hike/hike.service';
import { PolylineEncoder } from 'src/app/polyline';

@Component({
  selector: 'app-hikes',
  templateUrl: './hikes.component.html',
  styleUrls: ['./hikes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HikesComponent implements OnInit {
  dataSource: any[] = [];
  columnsToDisplay = ['name', 'startTime', 'endTime', 'startCoord', 'endCoord'];
  expandedElement: any | null;
  pipeFormat = 'MMMM dd, yyyy, h:mm a';

  style: Style | undefined;
  map: Map | undefined;
  vectorSrc: VectorSource<any> | undefined;

  polylineEncoder = new PolylineEncoder();

  constructor(private hikeService: HikeService) {}

  ngOnInit(): void {
    this.style = new Style({
      stroke: new Stroke({
        width: 6,
        color: '#0000FF',
      }),
    });
    this.vectorSrc = new VectorSource();
    this.map = new Map({
      target: 'map-hike',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.vectorSrc,
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([-80.2374, 44.1]),
        zoom: 7,
      }),
    });

    this.hikeService.list().subscribe((data) => {
      this.dataSource = data;
    });
  }

  hikeClicked(hike: any) {
    this.vectorSrc?.clear();

    const route = new PolyLine({
      factor: 1e5,
    }).readGeometry(hike['polyline'], {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    const feature = new Feature({
      type: 'route',
      geometry: route,
    });
    feature.setStyle(this.style);
    this.vectorSrc?.addFeature(feature);

    const middleCoord = this.getMiddleCoord(hike['polyline']);
    this.map?.setView(
      new View({
        center: olProj.fromLonLat([middleCoord[1], middleCoord[0]]),
        zoom: 10,
      })
    );
  }

  getMiddleCoord(geoString: string) {
    const coords = this.polylineEncoder.decode(geoString);

    return coords[Math.floor(coords.length / 2)];
  }
}
