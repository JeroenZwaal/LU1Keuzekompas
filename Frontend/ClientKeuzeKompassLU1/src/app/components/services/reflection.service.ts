import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Reflection, CreateReflectionDto } from '../models/reflection.model';

@Injectable({
  providedIn: 'root'
})
export class ReflectionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Haal reflectie voor specifieke module op (van huidige gebruiker)
  getMyModuleReflection(moduleId: string): Observable<any> {
  const url = `${this.apiUrl}/modules/${moduleId}/reflections/my-reflection`;
  
  return this.http.get<any>(url)
    .pipe(
      tap(response => console.log('My reflection loaded:', response)),
      catchError(error => {
        if (error.status === 404) {
          console.log('No reflection found for this module');
          return of(null); // Return null in plaats van error
        }
        console.error('Error loading my reflection:', error);
        return throwError(() => error);
      })
    );
}

  // Maak nieuwe reflectie
  saveReflection(moduleId: string, reflection: CreateReflectionDto): Observable<any> {
    const url = `${this.apiUrl}/modules/${moduleId}/reflections`;
    const reflectionData = {
      ...reflection
    };

    return this.http.post<any>(url, reflectionData)
      .pipe(
        tap(response => console.log('Reflection saved:', response)),
        catchError(error => {
          console.error('Error saving reflection:', error);
          console.error('URL was:', url);
          return throwError(() => error);
        })
      );
  }

  // Update bestaande reflectie
  updateReflection(moduleId: string, reflectionId: string, reflection: CreateReflectionDto): Observable<any> {
    const url = `${this.apiUrl}/modules/${moduleId}/reflections/${reflectionId}`;

    return this.http.put<any>(url, reflection)
      .pipe(
        tap(response => console.log('Reflection updated:', response)),
        catchError(error => {
          console.error('Error updating reflection:', error);
          console.error('URL was:', url);
          return throwError(() => error);
        })
      );
  }

  // Verwijder reflectie
  deleteReflection(moduleId: string, reflectionId: string): Observable<any> {
    const url = `${this.apiUrl}/modules/${moduleId}/reflections/${reflectionId}`;

    return this.http.delete<any>(url)
      .pipe(
        tap(response => console.log('✅ Reflection deleted:', response)),
        catchError(error => {
          console.error('Error deleting reflection:', error);
          console.error('URL was:', url);
          return throwError(() => error);
        })
      );
  }
}