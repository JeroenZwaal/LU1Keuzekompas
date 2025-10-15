import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserFavorite } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addFavorite(favorite: Omit<UserFavorite, 'addedAt'>): Observable<User> {
    const favoriteData = {
      module_id: favorite.moduleId,
      module_name: favorite.moduleName,
      studycredit: favorite.studycredit,
      location: favorite.location
    };

    return this.http.post<User>(`${this.apiUrl}/users/favorites`, favoriteData)
      .pipe(
        tap(user => {
          // Update current user in auth service
          this.authService.refreshUser().subscribe();
        }),
        catchError(error => {
          console.error('Error adding favorite:', error);
          return throwError(() => error);
        })
      );
  }


  removeFavorite(moduleId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/favorites/${moduleId}`)
      .pipe(
        tap(user => {
          // Update current user in auth service
          this.authService.refreshUser().subscribe();
        }),
        catchError(error => {
          console.error('Error removing favorite:', error);
          return throwError(() => error);
        })
      );
  }
}