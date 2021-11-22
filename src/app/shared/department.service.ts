import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getDepartment() {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
          })
        };
        return this.http.get(environment.apiBaseUrl + '/getdepartment', httpOptions);
  }
}