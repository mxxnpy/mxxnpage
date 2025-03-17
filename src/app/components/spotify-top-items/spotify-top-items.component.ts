import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify-top-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <svg class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4M15,12L11,16V8L15,12Z" />
        </svg>
        <h3>Top Tracks & Artists</h3>
      </div>
      
      <div class="tabs">
        <button 
          class="tab-button" 
          [class.active]="activeTab === 'tracks'"
          (click)="setActiveTab('tracks')">
          Tracks
        </button>
        <button 
          class="tab-button" 
          [class.active]="activeTab === 'artists'"
          (click)="setActiveTab('artists')">
          Artists
        </button>
      </div>
      
      <div class="time-range-selector">
        <button 
          class="range-button" 
          [class.active]="timeRange === 'short_term'"
          (click)="setTimeRange('short_term')">
          4 Weeks
        </button>
        <button 
          class="range-button" 
          [class.active]="timeRange === 'medium_term'"
          (click)="setTimeRange('medium_term')">
          6 Months
        </button>
        <button 
          class="range-button" 
          [class.active]="timeRange === 'long_term'"
          (click)="setTimeRange('long_term')">
          All Time
        </button>
      </div>
      
      <div *ngIf="loading" class="loading">
        <p>Loading top {{ activeTab }}...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <!-- Top Tracks -->
      <div *ngIf="!loading && !error && activeTab === 'tracks' && topTracks.length > 0" class="top-items">
        <div *ngFor="let track of topTracks; let i = index" class="item">
          <div class="item-rank">{{ i + 1 }}</div>
          <div class="item-image">
            <img 
              [src]="track.album?.images[0]?.url || 'assets/placeholder-album.jpg'" 
              [alt]="track.album?.name"
            >
          </div>
          <div class="item-details">
            <div class="item-name">{{ track.name }}</div>
            <div class="item-artist">{{ getArtistNames(track.artists) }}</div>
          </div>
        </div>
      </div>
      
      <!-- Top Artists -->
      <div *ngIf="!loading && !error && activeTab === 'artists' && topArtists.length > 0" class="top-items">
        <div *ngFor="let artist of topArtists; let i = index" class="item">
          <div class="item-rank">{{ i + 1 }}</div>
          <div class="item-image">
            <img 
              [src]="artist.images[0]?.url || 'assets/placeholder-artist.jpg'" 
              [alt]="artist.name"
            >
          </div>
          <div class="item-details">
            <div class="item-name">{{ artist.name }}</div>
            <div class="item-genres">{{ formatGenres(artist.genres) }}</div>
          </div>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && ((activeTab === 'tracks' && topTracks.length === 0) || (activeTab === 'artists' && topArtists.length === 0))" class="no-data">
        <p>No top {{ activeTab }} found for this time period</p>
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
    
    .tabs {
      display: flex;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .tab-button {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      color: var(--secondary-text);
      transition: color 0.2s ease;
    }
    
    .tab-button.active {
      color: var(--text-color);
      border-bottom: 2px solid var(--accent-color);
    }
    
    .time-range-selector {
      display: flex;
      margin-bottom: 1rem;
    }
    
    .range-button {
      background: none;
      border: 1px solid var(--border-color);
      padding: 0.25rem 0.75rem;
      font-size: 0.85rem;
      cursor: pointer;
      color: var(--secondary-text);
      transition: all 0.2s ease;
      border-radius: 0;
    }
    
    .range-button:first-child {
      border-radius: 4px 0 0 4px;
    }
    
    .range-button:last-child {
      border-radius: 0 4px 4px 0;
    }
    
    .range-button.active {
      background-color: var(--accent-color);
      color: white;
      border-color: var(--accent-color);
    }
    
    .loading, .error, .no-data {
      padding: 1rem 0;
      text-align: center;
    }
    
    .error {
      color: #ff4d4f;
    }
    
    .top-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .item:last-child {
      border-bottom: none;
    }
    
    .item-rank {
      width: 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      color: var(--secondary-text);
    }
    
    .item-image {
      width: 50px;
      height: 50px;
      margin: 0 1rem;
    }
    
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .item-details {
      flex: 1;
    }
    
    .item-name {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .item-artist, .item-genres {
      font-size: 0.85rem;
      color: var(--secondary-text);
    }
  `]
})
export class SpotifyTopItemsComponent implements OnInit {
  activeTab: 'tracks' | 'artists' = 'tracks';
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term';
  
  topTracks: any[] = [];
  topArtists: any[] = [];
  
  loading = true;
  error: string | null = null;
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit() {
    this.loadTopItems();
  }
  
  setActiveTab(tab: 'tracks' | 'artists') {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.loadTopItems();
    }
  }
  
  setTimeRange(range: 'short_term' | 'medium_term' | 'long_term') {
    if (this.timeRange !== range) {
      this.timeRange = range;
      this.loadTopItems();
    }
  }
  
  loadTopItems() {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getTopItems(this.activeTab, this.timeRange, 10).subscribe({
      next: (data) => {
        if (this.activeTab === 'tracks') {
          this.topTracks = data.items || [];
        } else {
          this.topArtists = data.items || [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error loading top ${this.activeTab}:`, error);
        this.error = `Failed to load top ${this.activeTab}`;
        this.loading = false;
      }
    });
  }
  
  getArtistNames(artists: any[]): string {
    if (!artists || artists.length === 0) return '';
    return artists.map(artist => artist.name).join(', ');
  }
  
  formatGenres(genres: string[]): string {
    if (!genres || genres.length === 0) return 'No genres';
    return genres.slice(0, 3).join(', ');
  }
}
