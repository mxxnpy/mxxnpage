import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.apiUrl + '/github';

  constructor(private http: HttpClient) { }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${username}`);
  }

  getUserActivity(username: string, limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/activity/${username}`, {
      params: { limit: limit.toString() }
    });
  }

  getUserContributions(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contributions/${username}`);
  }
}
