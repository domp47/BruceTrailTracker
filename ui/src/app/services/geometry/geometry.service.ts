import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class GeometryService extends BaseService {
  constructor(private httpClient: HttpClient, snackbar: MatSnackBar) {
    super('geometry', snackbar);
  }

  get(): Observable<any> {
    return this.httpClient.get(`${this.url}`).pipe(
      map((data) => data),
      catchError((err) => this.handleError('Error Getting Geometry', err))
    );
  }

  getDistance(sLat: number, sLong: number, eLat: number, eLong: number) {
    return this.httpClient
      .post(this.url, {
        startLat: sLat,
        startLong: sLong,
        endLat: eLat,
        endLong: eLong,
      })
      .pipe(
        map((data) => data),
        catchError((err) => this.handleError('Error Getting Geometry', err))
      );
  }
}
