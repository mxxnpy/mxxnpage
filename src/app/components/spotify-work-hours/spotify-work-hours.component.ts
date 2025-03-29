import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify-work-hours',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <svg class="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
        </svg>
        <h3>Work Hours Analysis</h3>
      </div>
      
      <div *ngIf="loading" class="loading">
        <p>Loading work hours analysis...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <div *ngIf="!loading && !error" class="work-hours-content">
        <div class="status-indicator" [class.active]="isWorkHours">
          <span class="status-dot" [class.active]="isWorkHours"></span>
          <span class="status-text">{{ isWorkHours ? 'Currently in work hours' : 'Currently outside work hours' }}</span>
        </div>
        
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Work Hours Listening</div>
            <div class="stat-value">{{ workHoursPercentage }}%</div>
            <div class="stat-desc">of total listening time</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-label">Peak Listening Time</div>
            <div class="stat-value">{{ peakListeningTime }}</div>
            <div class="stat-desc">most active during this period</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-label">Listening Trend</div>
            <div class="stat-value" [class.positive]="listeningTrend.startsWith('+')">{{ listeningTrend }}</div>
            <div class="stat-desc">compared to previous period</div>
          </div>
        </div>
        
        <div class="genres-section">
          <div class="genres-column">
            <h4>Work Hours Genres</h4>
            <ul class="genres-list">
              <li *ngFor="let genre of workGenres">{{ genre }}</li>
            </ul>
          </div>
          
          <div class="genres-column">
            <h4>Non-Work Hours Genres</h4>
            <ul class="genres-list">
              <li *ngFor="let genre of nonWorkGenres">{{ genre }}</li>
            </ul>
          </div>
        </div>
        
        <div class="productivity-section">
          <h4>Most Productive Genre</h4>
          <div class="productive-genre">{{ mostProductiveGenre }}</div>
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
    
    h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.75rem;
    }
    
    .loading, .error {
      padding: 1rem 0;
      text-align: center;
    }
    
    .error {
      color: #ff4d4f;
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 0.75rem;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .status-indicator.active {
      background-color: rgba(50, 145, 255, 0.1);
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--secondary-text);
      margin-right: 0.75rem;
    }
    
    .status-dot.active {
      background-color: var(--accent-color);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .stat-item {
      padding: 0.75rem;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: var(--secondary-text);
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .stat-value.positive {
      color: #52c41a;
    }
    
    .stat-desc {
      font-size: 0.75rem;
      color: var(--secondary-text);
    }
    
    .genres-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .genres-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .genres-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
    }
    
    .genres-list li:last-child {
      border-bottom: none;
    }
    
    .productivity-section {
      padding: 0.75rem;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .productive-genre {
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
    }
    
    @media (max-width: 650px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .genres-section {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SpotifyWorkHoursComponent implements OnInit {
  loading = true;
  error: string | null = null;
  
  // Work hours analysis data
  isWorkHours = false;
  workHoursPercentage = 0;
  peakListeningTime = '';
  listeningTrend = '';
  workGenres: string[] = [];
  nonWorkGenres: string[] = [];
  mostProductiveGenre = '';
  
  constructor(private spotifyService: SpotifyService) {}
  
  ngOnInit() {
    this.loadWorkHoursAnalysis();
  }
  
 loadWorkHoursAnalysis() {
    this.loading = true;
    this.error = null;
    
    this.spotifyService.getWorkHoursAnalysis().subscribe({
      next: (data: any) => {
        this.isWorkHours = data.isCurrentlyInWorkHours || false;
        this.workHoursPercentage = data.workHoursPercentage || 0;
        this.peakListeningTime = data.peakListeningTime || '';
        this.listeningTrend = data.listeningTrend || '';
        this.workGenres = data.workGenres || [];
        this.nonWorkGenres = data.nonWorkGenres || [];
        this.mostProductiveGenre = data.mostProductiveGenre || '';
        
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading work hours analysis:', error);
        this.error = 'Failed to load work hours analysis';
        this.loading = false;
      }
    });
  }
  
  // Helper method to check if current time is work hours
  private checkIfWorkHours(): boolean {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);
    
    // Check if it's a weekday (1-5 is Monday-Friday)
    const isWeekday = day >= 1 && day <= 5;
    
    // Check if current time is between 8:30 and 18:30
    const isWorkTime = currentTime >= 8.5 && currentTime <= 18.5;
    
    return isWeekday && isWorkTime;
  }
}
