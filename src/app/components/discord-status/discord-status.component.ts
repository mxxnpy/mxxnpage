import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscordService } from '../../services/discord.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-discord-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="status-item" *ngIf="!loading && !error">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
      </svg>
      <span *ngIf="presence">
        {{ getStatusText() }}
      </span>
    </p>
    
    <p class="status-item" *ngIf="loading">Loading Discord status...</p>
    <p class="status-item error" *ngIf="error">{{ error }}</p>
  `,
  styles: []
})
export class DiscordStatusComponent implements OnInit {
  presence: any = null;
  activities: any[] = [];
  loading = true;
  error: string | null = null;
  private updateSubscription: Subscription | null = null;

  constructor(private discordService: DiscordService) {}

  ngOnInit() {
    this.getPresenceAndActivity();
    
    // Update status every 30 seconds
    this.updateSubscription = interval(30000).subscribe(() => {
      this.getPresenceAndActivity();
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  getPresenceAndActivity() {
    this.getPresence();
    this.getActivity();
  }

  getPresence() {
    this.discordService.getPresence().subscribe({
      next: (data) => {
        this.presence = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load Discord presence';
        this.loading = false;
        console.error('Discord presence error:', err);
      }
    });
  }

  getActivity() {
    this.discordService.getActivity().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.error('Discord activity error:', err);
      }
    });
  }

  getStatusText(): string {
    if (!this.presence) return '';
    
    const status = this.presence.status;
    let statusText = '';
    
    switch (status) {
      case 'online':
        statusText = 'Online';
        break;
      case 'idle':
        statusText = 'Idle';
        break;
      case 'dnd':
        statusText = 'Do Not Disturb';
        break;
      case 'offline':
        statusText = 'Offline';
        break;
      default:
        statusText = 'Unknown';
    }
    
    if (this.activities && this.activities.length > 0) {
      const activity = this.activities[0];
      statusText += ` — ${activity.name}`;
      if (activity.details) {
        statusText += `: ${activity.details}`;
      }
    }
    
    return statusText;
  }

  formatTimestamp(timestamp: string | number): string {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'string' 
      ? new Date(timestamp) 
      : new Date(timestamp);
      
    // If it's within the last hour, show "X minutes ago"
    const minutesAgo = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutesAgo < 60) {
      return minutesAgo === 0 ? 'just now' : `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    }
    
    // Otherwise, show the time
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
