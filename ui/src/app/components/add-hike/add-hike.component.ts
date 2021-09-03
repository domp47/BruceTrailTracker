import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as olProj from 'ol/proj';
import PolyLine from 'ol/format/Polyline';
import VectorSource from 'ol/source/Vector';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { GeometryService } from 'src/app/services/geometry/geometry.service';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';

@Component({
  selector: 'app-add-hike',
  templateUrl: './add-hike.component.html',
  styleUrls: ['./add-hike.component.scss']
})
export class AddHikeComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    startLat: new FormControl(null, [Validators.required, AddHikeComponent.validateNumber(-90, 90)]),
    startLong: new FormControl(null, [Validators.required, AddHikeComponent.validateNumber(-180, 180)]),
    endLat: new FormControl(null, [Validators.required, AddHikeComponent.validateNumber(-90, 90)]),
    endLong: new FormControl(null, [Validators.required, AddHikeComponent.validateNumber(-180, 180)])
  })
  vectorSrc: VectorSource<any>;
  outstandingStyle: Style;
  map: Map | undefined;

  constructor(private router: Router, private geoService: GeometryService) { 
    this.vectorSrc = new VectorSource();
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
      var route = new PolyLine({
        factor: 1e5
      }).readGeometry(data["total"]["polyline"], {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      var feature = new Feature({
        type: 'route',
        geometry: route
      });
      feature.setStyle(this.outstandingStyle);
      this.vectorSrc.addFeature(feature);
    });
  }

  cancel() {
    this.router.navigateByUrl("/hikes");
  }

  save() {
  }

  static validateNumber(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const n = Number(control.value)

      return isNaN(n) || n < min || n > max ? {outOfRange: {value: control.value}} : null;
    };
  }
}
