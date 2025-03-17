import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {
  private apiUrl = environment.discordApiUrl;

  constructor(private http: HttpClient) { }

  getPresence(): Observable<any> {
    return this.http.get(`${this.apiUrl}/presence`);
  }

  getActivity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activity`);
  }
}
