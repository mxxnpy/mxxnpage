import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpotifyAuthComponent } from '../spotify-auth/spotify-auth.component';

@Component({
  selector: 'app-spotify-top-artists',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpotifyAuthComponent],
  template: `
    <div *ngIf="loading" class="status-item">
      <svg viewBox="0 0 24 24" width="16" height="16" class="icon">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <span>Loading top artists...</span>
    </div>
    
    <div *ngIf="error" class="status-item error">
      {{ error }}
    </div>
    
    <div *ngIf="!loading && !error && artists.length === 0" class="status-item">
      No top artists found
    </div>
    
    <div *ngIf="!loading && !error && artists.length > 0">
      <div class="now-playing-header">
        <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
          <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M10,16.5L16,12L10,7.5V16.5Z" />
        </svg>
        <span>Top Artists</span>
      </div>
      
      <div class="artists-grid">
        <div *ngFor="let artist of artists" class="artist-card">
          <div class="artist-image">
            <img [src]="artist.image" [alt]="artist.name">
          </div>
          <div class="artist-info">
            <div class="artist-name">{{ artist.name }}</div>
            <div class="artist-genres" *ngIf="artist.genres && artist.genres.length > 0">
              {{ artist.genres.slice(0, 2).join(', ') }}
            </div>
            <a *ngIf="artist.url" [href]="artist.url" target="_blank" class="artist-link">
              Open in Spotify
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .artists-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 16px;
      max-width: 650px;
    }
    
    .artist-card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .artist-image {
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
    }
    
    .artist-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .artist-info {
      padding: 12px;
      display: flex;
      flex-direction: column;
    }
    
    .artist-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .artist-genres {
      font-size: 12px;
      opacity: 0.6;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .artist-link {
      color: #F4D03F;
      opacity: 0.9;
      transition: opacity 0.2s;
      text-decoration: none;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .artist-link:hover {
      opacity: 1;
    }
    
    @media (max-width: 600px) {
      .artists-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class SpotifyTopArtistsComponent implements OnInit {
  artists: any[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit(): void {
    this.loadTopArtists();
  }
  
  loadTopArtists(): void {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getTopItems('artists', 'short_term', 6).subscribe({
      next: (data) => {
        if (data && data.items) {
          this.artists = data.items.map((artist: any) => ({
            name: artist.name,
            image: artist.images?.[0]?.url,
            genres: artist.genres,
            url: artist.external_urls?.spotify,
            popularity: artist.popularity
          }));
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading top artists:', error);
        if (error.status === 401) {
          this.error = 'Authentication required';
          // Redirect to authentication
          window.location.href = `${window.location.origin.replace('4202', '3000')}/backend/spotify/auth/login`;
        } else {
          this.error = 'Failed to load top artists';
        }
        this.loading = false;
      }
    });
  }
}
