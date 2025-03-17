import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpotifyAuthComponent } from '../spotify-auth/spotify-auth.component';

@Component({
  selector: 'app-spotify-top-tracks',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpotifyAuthComponent],
  template: `
    <div *ngIf="loading" class="status-item">
      <svg viewBox="0 0 24 24" width="16" height="16" class="icon">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <span>Loading top tracks...</span>
    </div>
    
    <div *ngIf="error" class="status-item error">
      {{ error }}
    </div>
    
    <div *ngIf="!loading && !error && tracks.length === 0" class="status-item">
      No top tracks found
    </div>
    
    <div *ngIf="!loading && !error && tracks.length > 0">
      <div class="now-playing-header">
        <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
          <path fill="currentColor" d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.56,12 7,13.56 7,15.5C7,17.44 8.56,19 10.5,19C12.44,19 14,17.44 14,15.5V6H18V3H12Z" />
        </svg>
        <span>Top Tracks</span>
      </div>
      
      <div class="tracks-list">
        <div *ngFor="let track of tracks; let i = index" class="track-item">
          <div class="track-rank">{{ i + 1 }}</div>
          <div class="track-image" *ngIf="track.albumArt">
            <img [src]="track.albumArt" [alt]="track.name">
          </div>
          <div class="track-info">
            <div class="track-name">{{ track.name }}</div>
            <div class="track-artist">{{ track.artist }}</div>
          </div>
          <a *ngIf="track.url" [href]="track.url" target="_blank" class="track-link">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tracks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      max-width: 650px;
    }
    
    .track-item {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 4px;
      padding: 12px;
    }
    
    .track-rank {
      width: 24px;
      opacity: 0.6;
      font-size: 14px;
      text-align: center;
      margin-right: 12px;
    }
    
    .track-image {
      width: 50px;
      height: 50px;
      margin-right: 16px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .track-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .track-info {
      flex: 1;
      min-width: 0;
    }
    
    .track-name {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .track-artist {
      font-size: 13px;
      opacity: 0.6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .track-link {
      color: #F4D03F;
      border: none;
      display: inline-flex;
      align-items: center;
      margin-left: 16px;
      opacity: 0.9;
      transition: opacity 0.2s;
    }
    
    .track-link:hover {
      opacity: 1;
    }
  `]
})
export class SpotifyTopTracksComponent implements OnInit {
  tracks: any[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit(): void {
    this.loadTopTracks();
  }
  
  loadTopTracks(): void {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getTopItems('tracks', 'short_term', 10).subscribe({
      next: (data) => {
        if (data && data.items) {
          this.tracks = data.items.map((track: any) => ({
            name: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            albumArt: track.album?.images?.[0]?.url,
            url: track.external_urls?.spotify,
            duration: track.duration_ms
          }));
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading top tracks:', error);
        if (error.status === 401) {
          this.error = 'Authentication required';
          // Redirect to authentication
          window.location.href = `${window.location.origin.replace('4202', '3000')}/backend/spotify/auth/login`;
        } else {
          this.error = 'Failed to load top tracks';
        }
        this.loading = false;
      }
    });
  }
}
