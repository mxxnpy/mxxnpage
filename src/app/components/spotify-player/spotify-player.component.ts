import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-spotify-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="status-item">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
      <span>Loading current track...</span>
    </div>
    
    <div *ngIf="error && error.includes('401')" class="status-item">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M12,2C6.477,2 2,6.477 2,12C2,17.523 6.477,22 12,22C17.523,22 22,17.523 22,12C22,6.477 17.523,2 12,2M12,4C16.418,4 20,7.582 20,12C20,16.418 16.418,20 12,20C7.582,20 4,16.418 4,12C4,7.582 7.582,4 12,4M15,12L11,16V8L15,12Z" />
      </svg>
      <span>Authentication required</span>
      <button (click)="authenticate()" class="connect-button">Connect</button>
    </div>
    
    <div *ngIf="error && !error.includes('401')" class="status-item error">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
      <span>{{ error }}</span>
    </div>
    
    <div *ngIf="!loading && !error && !currentTrack" class="status-item">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.56,12 7,13.56 7,15.5C7,17.44 8.56,19 10.5,19C12.44,19 14,17.44 14,15.5V6H18V3H12Z" />
      </svg>
      <span>Not currently playing anything</span>
    </div>
    
    <div *ngIf="!loading && !error && currentTrack" class="now-playing">
      <div class="now-playing-header">
        <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
          <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M10,16.5L16,12L10,7.5V16.5Z" />
        </svg>
        <span>Now Playing</span>
      </div>
      
      <div class="track-container">
        <div class="album-art" *ngIf="currentTrack.album?.images && currentTrack.album.images.length > 0">
          <img [src]="currentTrack.album.images[0].url" [alt]="currentTrack.album?.name">
        </div>
        <div class="track-info">
          <div class="track-name">{{ currentTrack.name }}</div>
          <div class="track-artist">{{ getArtistNames(currentTrack.artists) }}</div>
          <div class="track-album" *ngIf="currentTrack.album">{{ currentTrack.album.name }}</div>
          
          <div class="track-progress">
            <div class="progress-bar-container">
              <div class="progress-bar" [style.width.%]="progressPercentage"></div>
            </div>
            <div class="time-info">
              <span class="current-time">{{ formatTime(currentTrack.progress_ms) }}</span>
              <span class="duration">{{ formatTime(currentTrack.duration_ms) }}</span>
            </div>
          </div>
          
          <a *ngIf="currentTrack.external_urls?.spotify" 
             [href]="currentTrack.external_urls.spotify" 
             target="_blank" 
             class="spotify-link">
            Open in Spotify
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .connect-button {
      background-color: transparent;
      color: var(--accent-color);
      border: 1px solid var(--border-color);
      padding: 0.25rem 0.75rem;
      margin-left: 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }
    
    .connect-button:hover {
      border-color: var(--text-color);
    }
    
    .now-playing {
      margin-bottom: 1.5rem;
    }
    
    .now-playing-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      opacity: 1;
      font-size: 20px;
      font-weight: 500;
      color: var(--text-color);
    }

    .track-container {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 16px;
      max-width: 650px;
    }
    
    .album-art {
      width: 150px;
      height: 150px;
      margin-right: 16px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .album-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .track-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
    }
    
    .track-name {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 8px;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .track-artist {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 8px;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .track-album {
      font-size: 14px;
      opacity: 0.6;
      margin-bottom: 16px;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .track-progress {
      margin-top: 4px;
      margin-bottom: 4px;
      width: 100%;
    }
    
    .progress-bar-container {
      width: 100%;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 3px;
    }
    
    .progress-bar {
      height: 100%;
      background-color: #F4D03F;
    }
    
    .time-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      opacity: 0.6;
      margin-top: 2px;
      color: var(--text-color);
    }
    
    .spotify-link {
      display: inline-block;
      color: #F4D03F;
      font-size: 14px;
      text-decoration: none;
      opacity: 0.9;
      transition: opacity 0.2s;
    }
    
    .spotify-link:hover {
      opacity: 1;
    }
  `]
})
export class SpotifyPlayerComponent implements OnInit, OnDestroy {
  currentTrack: any = null;
  loading = true;
  error: string | null = null;
  progressPercentage = 0;
  
  private refreshInterval = 10000; // 10 seconds
  private subscription: Subscription | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit() {
    this.loadCurrentTrack();
    
    // Set up polling for current track
    this.subscription = interval(this.refreshInterval).pipe(
      switchMap(() => this.spotifyService.getNowPlaying())
    ).subscribe({
      next: (data) => this.updateCurrentTrack(data),
      error: (error) => {
        console.error('Error refreshing current track:', error);
        // Don't show error on refresh, only on initial load
      }
    });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  authenticate() {
    window.location.href = `${window.location.origin.replace('4202', '3000')}/backend/spotify/auth/login`;
  }
  
  loadCurrentTrack() {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getNowPlaying().subscribe({
      next: (data) => {
        if (!data) {
          this.error = 'No track currently playing';
        } else {
          this.updateCurrentTrack(data);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading current track:', error);
        if (error.status === 401) {
          this.error = '401: Authentication required';
        } else {
          this.error = 'Failed to load current track';
        }
        this.loading = false;
      }
    });
  }
  
  updateCurrentTrack(data: any) {
    if (data) {
      // Handle different response structures
      if (data.item) {
        // Standard Spotify API response
        this.currentTrack = data.item;
        this.currentTrack.progress_ms = data.progress_ms || 0;
        this.progressPercentage = (data.progress_ms / data.item.duration_ms) * 100;
      } else if (data.name && data.artists) {
        // Direct track object
        this.currentTrack = data;
        this.currentTrack.progress_ms = data.progress_ms || 0;
        this.progressPercentage = (data.progress_ms / data.duration_ms) * 100;
      } else {
        this.currentTrack = null;
        this.progressPercentage = 0;
      }
    } else {
      this.currentTrack = null;
      this.progressPercentage = 0;
    }
  }
  
  getArtistNames(artists: any[]): string {
    if (!artists || artists.length === 0) return '';
    return artists.map(artist => artist.name).join(', ');
  }
  
  formatTime(ms: number): string {
    if (!ms) return '0:00';
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
