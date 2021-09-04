import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import PolyLine from 'ol/format/Polyline';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { Component, OnInit } from '@angular/core';
import { GeometryService } from 'src/app/services/geometry/geometry.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  map: Map | undefined;
  vectorSrc: VectorSource<any>;
  outstandingStyle: Style;
  hikedStyle: Style;

  disHiked: number = 0;
  totalDis: number = 0;

  constructor(private geoService: GeometryService) { 
    this.vectorSrc = new VectorSource();
    this.hikedStyle = new Style({
      stroke: new Stroke({
        width: 6, color: "#0000FF"
      })
    });
    this.outstandingStyle = new Style({
      stroke: new Stroke({
        width: 6, color: "#FF0000"
      })
    });
  }

  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: this.vectorSrc
        })
      ],
      view: new View({
        center: olProj.fromLonLat([-80.2374, 44.1]),
        zoom: 8.5
      })
    });

    this.geoService.get().subscribe((data) => {
      this.add_polyline(data["total"]["polyline"]);

      this.disHiked = data["completed"]["distance"];
      this.totalDis = data["total"]["distance"];

      var completedPolys = data["completed"]["polyline"];
      for (let index = 0; index < completedPolys.length; index++) {
        const geoString = completedPolys[index];
        
        this.add_polyline(geoString, true);
      }
    });
  }

  add_polyline(geoString: string, hiked: boolean = false){
    var route = new PolyLine({
      factor: 1e5
    }).readGeometry(geoString, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    var feature = new Feature({
      type: 'route',
      geometry: route
    });
    feature.setStyle(hiked ? this.hikedStyle : this.outstandingStyle);
    this.vectorSrc.addFeature(feature);
  }

}
