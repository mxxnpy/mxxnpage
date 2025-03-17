import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify-listening-activity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <svg class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12,2C6.477,2 2,6.477 2,12C2,17.523 6.477,22 12,22C17.523,22 22,17.523 22,12C22,6.477 17.523,2 12,2M12,4C16.418,4 20,7.582 20,12C20,16.418 16.418,20 12,20C7.582,20 4,16.418 4,12C4,7.582 7.582,4 12,4M15,12L11,16V8L15,12Z" />
        </svg>
        <h3>Recently Played</h3>
      </div>
      
      <div *ngIf="loading" class="loading">
        <p>Loading recently played tracks...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <div *ngIf="!loading && !error && recentlyPlayed.length === 0" class="no-data">
        <p>No recently played tracks found</p>
      </div>
      
      <div *ngIf="!loading && !error && recentlyPlayed.length > 0" class="recently-played">
        <div *ngFor="let item of recentlyPlayed" class="track-item">
          <div class="track-image">
            <img 
              [src]="item.track.album?.images[0]?.url || 'assets/placeholder-album.jpg'" 
              [alt]="item.track.album?.name"
            >
          </div>
          
          <div class="track-details">
            <div class="track-name">{{ item.track.name }}</div>
            <div class="artist-name">{{ getArtistNames(item.track.artists) }}</div>
            <div class="played-at">{{ formatTimestamp(item.played_at) }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: var(--card-background);
      border-radius: 5px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border-color);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .icon {
      margin-right: 0.75rem;
    }
    
    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
    
    .loading, .error, .no-data {
      padding: 1rem 0;
      text-align: center;
    }
    
    .error {
      color: #ff4d4f;
    }
    
    .recently-played {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .track-item {
      display: flex;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .track-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .track-image {
      flex: 0 0 60px;
    }
    
    .track-image img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .track-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .track-name {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .artist-name {
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .played-at {
      font-size: 0.8rem;
      color: var(--secondary-text);
    }
  `]
})
export class SpotifyListeningActivityComponent implements OnInit {
  recentlyPlayed: any[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit() {
    this.loadRecentlyPlayed();
  }
  
  loadRecentlyPlayed() {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getRecentlyPlayed(10).subscribe({
      next: (data: any) => {
        this.recentlyPlayed = data.items || [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading recently played tracks:', error);
        this.error = 'Failed to load recently played tracks';
        this.loading = false;
      }
    });
  }
  
  getArtistNames(artists: any[]): string {
    if (!artists || artists.length === 0) return '';
    return artists.map(artist => artist.name).join(', ');
  }
  
  formatTimestamp(timestamp: string): string {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
}
