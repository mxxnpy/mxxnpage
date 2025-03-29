import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { GithubService } from '../../services/github.service';
import { HttpClient } from '@angular/common/http';

interface GithubUserInfo {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  bio?: string;
}

interface GithubActivity {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

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
          <div *ngFor="let activity of activities" class="activity-item">
            <mat-icon>{{ getActivityIcon(activity.type) }}</mat-icon>
            <div class="activity-details">
              <p class="activity-type">{{ formatEventType(activity.type) }}</p>
              <p class="activity-repo">{{ activity.repo.name }}</p>
              <p class="activity-time">{{ getTimeAgo(activity.created_at) }}</p>
            </div>
          </div>
        </div>
        
        <div *ngIf="!loading && activities && activities.length === 0" class="no-activity">
          <p>No recent activity found</p>
        </div>
        
        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .github-card {
      margin-bottom: 1rem;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .user-details {
      flex: 1;
    }
    
    .stats {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    .stat {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .activity-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .activity-details {
      flex: 1;
    }
    
    .activity-type {
      font-weight: 500;
      margin: 0;
    }
    
    .activity-repo {
      font-size: 0.9rem;
      color: var(--secondary-text);
      margin: 0;
    }
    
    .activity-time {
      font-size: 0.8rem;
      color: var(--secondary-text);
      margin: 0;
    }
    
    .no-activity {
      text-align: center;
      color: var(--secondary-text);
    }
    
    .error-message {
      color: #ff4d4f;
      text-align: center;
    }
  `]
})
export class GithubActivityComponent implements OnInit {
  @Input() username: string = 'mxxnpy';
  
  userInfo: GithubUserInfo | null = null;
  activities: GithubActivity[] = [];
  loading = true;
  error: string | null = null;

  constructor(private githubService: GithubService, private http: HttpClient) {}

  ngOnInit() {
    this.getUserProfile();
    this.getUserActivity();
  }

  getUserProfile() {
    this.githubService.getUserProfile(this.username).subscribe({
      next: (data: GithubUserInfo) => {
        this.userInfo = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        this.error = 'Failed to load GitHub user information';
        this.loading = false;
        console.error('GitHub user info error:', err);
      }
    });
  }

  getUserActivity() {
    this.githubService.getUserActivity(this.username, 5).subscribe({
      next: (data: GithubActivity[]) => {
        this.activities = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        this.error = 'Failed to load GitHub activity';
        this.loading = false;
        console.error('GitHub activity error:', err);
      }
    });
  }

  formatEventType(type: string): string {
    const typeMap = {
      'PushEvent': 'Pushed to',
      'CreateEvent': 'Created',
      'DeleteEvent': 'Deleted',
      'IssuesEvent': 'Created issue',
      'PullRequestEvent': 'Created pull request',
      'PullRequestReviewEvent': 'Reviewed pull request',
      'IssueCommentEvent': 'Commented on issue',
      'PullRequestReviewCommentEvent': 'Commented on pull request',
      'CommitCommentEvent': 'Commented on commit',
      'WatchEvent': 'Starred',
      'ForkEvent': 'Forked',
      'ReleaseEvent': 'Published release'
    };
    
    return typeMap[type] || type;
  }

  getActivityIcon(type: string): string {
    const iconMap = {
      'PushEvent': 'git_commit',
      'CreateEvent': 'add_circle',
      'DeleteEvent': 'delete',
      'IssuesEvent': 'bug_report',
      'PullRequestEvent': 'code',
      'PullRequestReviewEvent': 'comment',
      'IssueCommentEvent': 'comment',
      'PullRequestReviewCommentEvent': 'comment',
      'CommitCommentEvent': 'comment',
      'WatchEvent': 'star',
      'ForkEvent': 'fork_right',
      'ReleaseEvent': 'publish'
    };
    
    return iconMap[type] || 'code';
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  }
}
