import { transform } from 'ol/proj';
import PolyLine from 'ol/format/Polyline';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import VectorSource from 'ol/source/Vector';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as olProj from 'ol/proj';
import { GeometryService } from 'src/app/services/geometry/geometry.service';
import { AddHikeComponent } from '../add-hike/add-hike.component';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

@Component({
  selector: 'app-plan-hike',
  templateUrl: './plan-hike.component.html',
  styleUrls: ['./plan-hike.component.scss'],
})
export class PlanHikeComponent implements OnInit {
  form = new FormGroup({
    startLat: new FormControl(null, [
      Validators.required,
      AddHikeComponent.validateNumber(-90, 90),
    ]),
    startLong: new FormControl(null, [
      Validators.required,
      AddHikeComponent.validateNumber(-180, 180),
    ]),
    endLat: new FormControl(null, [
      Validators.required,
      AddHikeComponent.validateNumber(-90, 90),
    ]),
    endLong: new FormControl(null, [
      Validators.required,
      AddHikeComponent.validateNumber(-180, 180),
    ]),
  });

  vectorSrc: VectorSource<any>;
  hikedStyle: Style;
  outstandingStyle: Style;
  map: Map | undefined;

  selectStart = false;
  selectEnd = false;

  overallPolyline: any;

  hikeDis = 0;

  constructor(private geoService: GeometryService) {
    this.vectorSrc = new VectorSource();
    this.hikedStyle = new Style({
      stroke: new Stroke({
        width: 6,
        color: '#0000FF',
      }),
    });
    this.outstandingStyle = new Style({
      stroke: new Stroke({
        width: 6,
        color: '#FF0000',
      }),
    });
  }

  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
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
        zoom: 8.5,
      }),
    });

    this.map.on('singleclick', this.mapClicked.bind(this));

    this.geoService.get().subscribe((data) => {
      this.overallPolyline = data['total']['polyline'];

      this.add_polyline(this.overallPolyline, false);
    });
  }

  mapClicked(evt: any) {
    const cords = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

    if (this.selectStart) {
      this.form.patchValue({ startLat: cords[1], startLong: cords[0] });
      this.selectStart = false;
    }
    if (this.selectEnd) {
      this.form.patchValue({ endLat: cords[1], endLong: cords[0] });
      this.selectEnd = false;
    }

    if (this.allHaveValues(['endLat', 'endLong', 'startLat', 'startLong'])) {
      this.geoService
        .getDistance(
          this.form.controls['startLat'].value,
          this.form.controls['startLong'].value,
          this.form.controls['endLat'].value,
          this.form.controls['endLong'].value
        )
        .subscribe((data: any) => {
          this.vectorSrc?.clear();
          this.add_polyline(this.overallPolyline, false);
          this.hikeDis = Math.round(data['distance'] * 100) / 100;
          this.add_polyline(data['polyline'], true);
        });
    }
  }

  allHaveValues(variables: string[]) {
    for (const v of variables) {
      if (this.form.controls[v].value === null) return false;
    }
    return true;
  }

  startClicked() {
    if (!this.selectStart) {
      this.selectEnd = false;
    }

    this.selectStart = !this.selectStart;
  }

  endClicked() {
    if (!this.selectEnd) {
      this.selectStart = false;
    }

    this.selectEnd = !this.selectEnd;
  }

  add_polyline(geoString: string, hiked = false) {
    const route = new PolyLine({
      factor: 1e5,
    }).readGeometry(geoString, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    const feature = new Feature({
      type: 'route',
      geometry: route,
    });
    feature.setStyle(hiked ? this.hikedStyle : this.outstandingStyle);
    this.vectorSrc.addFeature(feature);
  }
}
