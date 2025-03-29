import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github-activity',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <mat-card class="github-card">
      <mat-card-header>
        <mat-icon mat-card-avatar>code</mat-icon>
        <mat-card-title>GitHub Activity</mat-card-title>
        <mat-card-subtitle>{{ username }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading" class="loading-container">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
        
        <div *ngIf="!loading && userInfo" class="user-info">
          <img [src]="userInfo.avatar_url" alt="GitHub Avatar" class="avatar">
          <div class="user-details">
            <h3>{{ userInfo.name || userInfo.login }}</h3>
            <p *ngIf="userInfo.bio">{{ userInfo.bio }}</p>
            <div class="stats">
              <div class="stat">
                <mat-icon>people</mat-icon>
                <span>{{ userInfo.followers }} followers</span>
              </div>
              <div class="stat">
                <mat-icon>book</mat-icon>
                <span>{{ userInfo.public_repos }} repos</span>
              </div>
            </div>
          </div>
        </div>
        
        <mat-divider *ngIf="!loading && userInfo" class="divider"></mat-divider>
        
        <div *ngIf="!loading && activities && activities.length > 0" class="activity-list">
          <h3>Recent Activity</h3>
          <div *ngFor="let activity of activities" class="activity-item">
            <mat-icon [ngSwitch]="activity.type">
              <ng-container *ngSwitchCase="'PushEvent'">push</ng-container>
              <ng-container *ngSwitchCase="'CreateEvent'">add</ng-container>
              <ng-container *ngSwitchCase="'IssuesEvent'">bug_report</ng-container>
              <ng-container *ngSwitchCase="'PullRequestEvent'">merge</ng-container>
              <ng-container *ngSwitchDefault>code</ng-container>
            </mat-icon>
            <div class="activity-details">
              <span class="activity-type">{{ formatEventType(activity.type) }}</span>
              <span class="activity-repo">{{ activity.repo?.name }}</span>
              <span class="activity-time">{{ activity.created_at | date:'MMM d, h:mm a' }}</span>
            </div>
          </div>
        </div>
        
        <div *ngIf="!loading && error" class="error-message">
          <mat-icon>error</mat-icon>
          <span>{{ error }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .github-card {
      height: 100%;
      transition: transform 0.3s ease;
    }
    
    .github-card:hover {
      transform: translateY(-5px);
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 24px 0;
    }
    
    .user-info {
      display: flex;
      margin-bottom: 16px;
    }
    
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
    }
    
    .user-details h3 {
      margin: 0 0 8px 0;
    }
    
    .user-details p {
      margin: 0 0 8px 0;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .stats {
      display: flex;
    }
    
    .stat {
      display: flex;
      align-items: center;
      margin-right: 16px;
    }
    
    .stat mat-icon {
      font-size: 16px;
      height: 16px;
      width: 16px;
      margin-right: 4px;
    }
    
    .divider {
      margin: 16px 0;
    }
    
    .activity-list h3 {
      margin: 0 0 16px 0;
      font-weight: 500;
    }
    
    .activity-item {
      display: flex;
      margin-bottom: 12px;
    }
    
    .activity-item mat-icon {
      margin-right: 12px;
      color: #555;
    }
    
    .activity-details {
      display: flex;
      flex-direction: column;
    }
    
    .activity-type {
      font-weight: 500;
    }
    
    .activity-repo {
      color: #0366d6;
    }
    
    .activity-time {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .error-message {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f44336;
      padding: 16px;
    }
    
    .error-message mat-icon {
      margin-right: 8px;
    }
    
    :host-context(.dark-theme) {
      .activity-repo {
        color: #58a6ff;
      }
      
      .user-details p,
      .activity-time {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  `]
})
export class GithubActivityComponent implements OnInit {
  @Input() username: string = 'mxxnpy';
  
  userInfo: any = null;
  activities: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.getUserProfile();
    this.getUserActivity();
  }

  getUserProfile() {
    this.githubService.getUserProfile(this.username).subscribe({
      next: (data: any) => {
        this.userInfo = data;
      },
      error: (err: any) => {
        this.error = 'Failed to load GitHub user information';
        this.loading = false;
        console.error('GitHub user info error:', err);
      }
    });
  }

  getUserActivity() {
    this.githubService.getUserActivity(this.username, 5).subscribe({
      next: (data: any[]) => {
        this.activities = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load GitHub activity';
        this.loading = false;
        console.error('GitHub activity error:', err);
      }
    });
  }

  formatEventType(type: string): string {
    // Remove 'Event' suffix and add spaces between camel case
    return type
      .replace('Event', '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  }
}
