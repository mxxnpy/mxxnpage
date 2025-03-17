import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status-item" *ngIf="isAuthenticating">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M12,2C6.477,2 2,6.477 2,12C2,17.523 6.477,22 12,22C17.523,22 22,17.523 22,12C22,6.477 17.523,2 12,2M12,4C16.418,4 20,7.582 20,12C20,16.418 16.418,20 12,20C7.582,20 4,16.418 4,12C4,7.582 7.582,4 12,4M15,12L11,16V8L15,12Z" />
      </svg>
      Connecting to Spotify...
    </div>
    
    <div class="status-item error" *ngIf="authError">
      {{ authError }}
    </div>
  `,
  styles: []
})
export class SpotifyAuthComponent implements OnInit {
  isAuthenticated = false;
  isAuthenticating = true;
  authError: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}
  
  ngOnInit() {
    // Auto-connect to Spotify on component initialization
    this.autoConnect();
    
    // Check for authentication success or error in URL params
    this.route.queryParams.subscribe(params => {
      if (params['auth_success'] === 'true') {
        this.isAuthenticated = true;
        this.isAuthenticating = false;
        this.authError = null;
        
        // Redirect to home page after successful authentication
        this.router.navigate(['/home']);
      } else if (params['auth_error']) {
        this.isAuthenticated = false;
        this.isAuthenticating = false;
        this.authError = `Authentication failed: ${params['auth_error']}`;
      }
    });
  }
  
  autoConnect() {
    // Redirect to Spotify authorization endpoint
    window.location.href = `${window.location.origin.replace('4202', '3000')}/backend/spotify/auth/login`;
  }
}
