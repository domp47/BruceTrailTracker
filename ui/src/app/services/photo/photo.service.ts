import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService extends BaseService {
  constructor(private httpClient: HttpClient, snackbar: MatSnackBar) {
    super('photos', snackbar);
  }

  list(): Observable<any> {
    return this.httpClient.get(`${this.url}`).pipe(
      map((data) => data),
      catchError((err) => this.handleError('Error Getting Photos', err))
    );
  }

  add(obj: any): Observable<any> {
    return this.httpClient.post(`${this.url}`, obj).pipe(
      map((data) => data),
      catchError((err) => this.handleError('Error Adding Photo', err))
    );
  }
}
