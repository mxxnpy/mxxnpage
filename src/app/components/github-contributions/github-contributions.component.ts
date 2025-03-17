import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github-contributions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p class="status-item">
        <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
          <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        <span *ngIf="!loading && !error">
          {{ totalContributions }} contributions in the last year
        </span>
        <span *ngIf="loading">Loading GitHub contributions...</span>
        <span *ngIf="error" class="error">{{ error }}</span>
      </p>
      
      <div *ngIf="!loading && !error" class="contributions-grid">
        <div class="contributions-months">
          <span *ngFor="let month of months" class="month-label">{{ month }}</span>
        </div>
        <div class="contributions-days-container">
          <div class="contributions-days-labels">
            <span class="day-label">Mon</span>
            <span class="day-label">Wed</span>
            <span class="day-label">Fri</span>
          </div>
          <div class="contributions-weeks-container">
            <div 
              *ngFor="let week of contributionsGrid" 
              class="contributions-week"
            >
              <div 
                *ngFor="let day of week" 
                class="contributions-day"
                [style.background-color]="getContributionColor(day.count)"
                [title]="day.date + ': ' + day.count + ' contributions'"
              ></div>
            </div>
          </div>
        </div>
        <div class="contributions-legend">
          <span class="legend-label">Less</span>
          <div class="legend-colors">
            <div class="legend-color" style="background-color: var(--border-color)"></div>
            <div class="legend-color" style="background-color: #0e4429"></div>
            <div class="legend-color" style="background-color: #006d32"></div>
            <div class="legend-color" style="background-color: #26a641"></div>
            <div class="legend-color" style="background-color: #39d353"></div>
          </div>
          <span class="legend-label">More</span>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && recentRepositories.length > 0" class="recent-repos">
        <p class="status-item">Recent Repositories</p>
        <ul>
          <li *ngFor="let repo of recentRepositories">
            <a [href]="repo.url" target="_blank">{{ repo.name }}</a>
            <span *ngIf="repo.language" class="repo-language">{{ repo.language }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .contributions-grid {
      margin: 1rem 0;
    }
    
    .contributions-months {
      display: flex;
      margin-left: 30px;
      margin-bottom: 5px;
    }
    
    .month-label {
      flex: 1;
      text-align: center;
      font-size: 0.7rem;
      color: var(--secondary-text);
    }
    
    .contributions-days-container {
      display: flex;
    }
    
    .contributions-days-labels {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 5px;
      font-size: 0.7rem;
      color: var(--secondary-text);
    }
    
    .day-label {
      height: 15px;
      line-height: 15px;
    }
    
    .contributions-weeks-container {
      display: flex;
      gap: 2px;
      overflow-x: auto;
    }
    
    .contributions-week {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .contributions-day {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background-color: var(--border-color);
    }
    
    .contributions-legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 5px;
      font-size: 0.7rem;
      color: var(--secondary-text);
    }
    
    .legend-colors {
      display: flex;
      gap: 2px;
      margin: 0 5px;
    }
    
    .legend-color {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
    
    .recent-repos ul {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0 0 0;
    }
    
    .recent-repos li {
      margin-bottom: 0.5rem;
    }
    
    .repo-language {
      font-size: 0.8rem;
      color: var(--secondary-text);
      margin-left: 0.5rem;
    }
    
    .error {
      color: #ff4d4f;
    }
  `]
})
export class GithubContributionsComponent implements OnInit {
  @Input() username: string = 'mxxnpy';
  
  loading = true;
  error: string | null = null;
  totalContributions = 0;
  contributionsGrid: any[][] = [];
  recentRepositories: any[] = [];
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  constructor(private githubService: GithubService) {}
  
  ngOnInit() {
    this.loadContributions();
  }
  
  loadContributions() {
    this.loading = true;
    this.error = null;
    
    this.githubService.getUserContributions(this.username).subscribe({
      next: (data: any) => {
        this.totalContributions = data.totalContributions || 0;
        this.recentRepositories = data.recentRepositories || [];
        
        // Process contributions data to create a grid
        this.processContributionsData(data.contributions || []);
        
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading GitHub contributions:', error);
        this.error = 'Failed to fetch GitHub contributions';
        this.loading = false;
      }
    });
  }
  
  processContributionsData(contributions: any[]) {
    // Sort contributions by date
    contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Create a map of dates to contribution counts
    const contributionMap = new Map<string, number>();
    contributions.forEach(day => {
      contributionMap.set(day.date, day.count);
    });
    
    // Generate a grid of weeks (rows) and days (columns)
    const weeks: any[][] = [];
    
    // Get the current date and calculate the date 52 weeks ago
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (52 * 7));
    
    // Adjust to start from Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    // Generate the grid
    let currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const week: any[] = [];
      
      // Create 7 days for each week
      for (let i = 0; i < 7; i++) {
        const dateString = currentDate.toISOString().split('T')[0];
        const count = contributionMap.get(dateString) || 0;
        
        week.push({
          date: dateString,
          count,
          day: currentDate.getDay()
        });
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push(week);
    }
    
    this.contributionsGrid = weeks;
  }
  
  getContributionColor(count: number): string {
    if (count === 0) return 'var(--border-color)';
    if (count < 3) return '#0e4429';
    if (count < 6) return '#006d32';
    if (count < 9) return '#26a641';
    return '#39d353';
  }
}
