import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.apiUrl + '/spotify';
  private developerActivityUrl = this.apiUrl + '/developer-activity';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    // Check if we have an auth_success parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth_success') === 'true') {
      this.isAuthenticated = true;
      // Remove the query parameters from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Get the currently playing track
  getNowPlaying(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-track`)
      .pipe(
        tap(() => this.isAuthenticated = true),
        catchError(this.handleError)
      );
  }

  // Get recently played tracks
  getRecentlyPlayed(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/recently-played`, {
      params: { limit: limit.toString() }
    }).pipe(
      tap(() => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }
  
  // Get top artists or tracks
  getTopItems(type: 'artists' | 'tracks', timeRange: string = 'medium_term', limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/top/${type}`, {
      params: {
        time_range: timeRange,
        limit: limit.toString()
      }
    }).pipe(
      tap(() => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }
  
  // Get user playlists
  getPlaylists(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlists`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(
      tap(() => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }
  
  // Get tracks in a playlist
  getPlaylistTracks(playlistId: string, limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlists/${playlistId}/tracks`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(
      tap(() => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }
  
  // Developer Activity Endpoints
  
  // Get work hours listening analysis
  getWorkHoursAnalysis(): Observable<any> {
    return this.http.get(`${this.developerActivityUrl}/work-hours-analysis`)
      .pipe(catchError(this.handleError));
  }
  
  // Get productivity correlation with music genres
  getProductivityCorrelation(): Observable<any> {
    return this.http.get(`${this.developerActivityUrl}/productivity-correlation`)
      .pipe(catchError(this.handleError));
  }
  
  // Get listening patterns over time
  getListeningPatterns(period: string = 'week'): Observable<any> {
    return this.http.get(`${this.developerActivityUrl}/listening-patterns`, {
      params: { period }
    }).pipe(catchError(this.handleError));
  }
  
  // Initiate Spotify authorization
  authorize(): void {
    window.location.href = `${environment.apiUrl}/spotify/auth/login`;
  }
  
  // Check if user is authenticated with Spotify
  checkAuthentication(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-user`)
      .pipe(
        tap(() => this.isAuthenticated = true),
        catchError(error => {
          this.isAuthenticated = false;
          return throwError(error);
        })
      );
  }
  
  // Logout from Spotify
  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/logout`)
      .pipe(
        tap(() => this.isAuthenticated = false),
        catchError(this.handleError)
      );
  }
  
  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
    } else if (error.status === 401) {
      // Authentication error
      console.error('Authentication required:', error.error);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was:`, 
        error.error
      );
    }
    // Return the error for further handling
    return throwError(error);
  }
}
