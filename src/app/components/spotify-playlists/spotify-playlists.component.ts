import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpotifyAuthComponent } from '../spotify-auth/spotify-auth.component';

@Component({
  selector: 'app-spotify-playlists',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpotifyAuthComponent],
  template: `
    <div *ngIf="loading" class="status-item">
      <svg viewBox="0 0 24 24" width="16" height="16" class="icon">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <span>Loading playlists...</span>
    </div>
    
    <div *ngIf="error" class="status-item error">
      {{ error }}
    </div>
    
    <div *ngIf="!loading && !error && playlists.length === 0" class="status-item">
      No playlists found
    </div>
    
    <div *ngIf="!loading && !error && playlists.length > 0">
      <div class="now-playing-header">
        <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
          <path fill="currentColor" d="M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z" />
        </svg>
        <span>Playlists</span>
      </div>
      
      <div class="playlists-grid">
        <div *ngFor="let playlist of playlists" class="playlist-card">
          <div class="playlist-image">
            <img [src]="playlist.image || 'assets/icons/spotify.svg'" [alt]="playlist.name">
          </div>
          <div class="playlist-info">
            <div class="playlist-name">{{ playlist.name }}</div>
            <div class="playlist-tracks" *ngIf="playlist.trackCount !== undefined">
              {{ playlist.trackCount }} tracks
            </div>
            <a *ngIf="playlist.url" [href]="playlist.url" target="_blank" class="playlist-link">
              Open in Spotify
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .playlists-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 16px;
      max-width: 650px;
    }
    
    .playlist-card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .playlist-image {
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
    }
    
    .playlist-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .playlist-info {
      padding: 12px;
      display: flex;
      flex-direction: column;
    }
    
    .playlist-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .playlist-tracks {
      font-size: 12px;
      opacity: 0.6;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .playlist-link {
      color: #F4D03F;
      opacity: 0.9;
      transition: opacity 0.2s;
      text-decoration: none;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .playlist-link:hover {
      opacity: 1;
    }
    
    @media (max-width: 600px) {
      .playlists-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class SpotifyPlaylistsComponent implements OnInit {
  playlists: any[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit(): void {
    this.loadPlaylists();
  }
  
  loadPlaylists(): void {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getPlaylists().subscribe({
      next: (data) => {
        if (data && data.items) {
          this.playlists = data.items.map((playlist: any) => ({
            name: playlist.name,
            image: playlist.images?.[0]?.url,
            url: playlist.external_urls?.spotify,
            trackCount: playlist.tracks?.total,
            owner: playlist.owner?.display_name
          }));
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading playlists:', error);
        if (error.status === 401) {
          this.error = 'Authentication required';
          // Redirect to authentication
          window.location.href = `${window.location.origin.replace('4202', '3000')}/backend/spotify/auth/login`;
        } else {
          this.error = 'Failed to load playlists';
        }
        this.loading = false;
      }
    });
  }
}
