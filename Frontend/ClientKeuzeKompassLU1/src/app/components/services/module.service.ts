import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules`)
      .pipe(
        catchError(error => {
          console.error('Error fetching modules:', error);
          return throwError(() => error);
        })
      );
  }

  getModuleById(id: string): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/modules/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching module:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Filter modules
   */
  filterModules(filters: {
    studycredit?: number;
    location?: string;
    level?: string;
    name?: string;
  }): Observable<Module[]> {
    const params = new URLSearchParams();
    
    if (filters.studycredit) params.append('studycredit', filters.studycredit.toString());
    if (filters.location) params.append('location', filters.location);
    if (filters.level) params.append('level', filters.level);
    if (filters.name) params.append('name', filters.name);

    const queryString = params.toString();
    const url = queryString ? `${this.apiUrl}/modules?${queryString}` : `${this.apiUrl}/modules`;

    return this.http.get<Module[]>(url)
      .pipe(
        catchError(error => {
          console.error('Error filtering modules:', error);
          return throwError(() => error);
        })
      );
  }
}