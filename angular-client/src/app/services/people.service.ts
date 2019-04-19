import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/api/people`);
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
