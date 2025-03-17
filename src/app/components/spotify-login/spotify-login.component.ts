import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-spotify-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spotify-login">
      <h3>Connect to Spotify</h3>
      <p>Connect your Spotify account to view your music data.</p>
      <button class="spotify-button" (click)="login()">
        <svg class="spotify-icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12,2C6.477,2 2,6.477 2,12C2,17.523 6.477,22 12,22C17.523,22 22,17.523 22,12C22,6.477 17.523,2 12,2M12,4C16.418,4 20,7.582 20,12C20,16.418 16.418,20 12,20C7.582,20 4,16.418 4,12C4,7.582 7.582,4 12,4M15,12L11,16V8L15,12Z" />
        </svg>
        Connect with Spotify
      </button>
    </div>
  `,
  styles: [`
    .spotify-login {
      padding: 2rem;
      text-align: center;
      background-color: var(--card-background);
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    
    h3 {
      margin-top: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    p {
      margin-bottom: 1.5rem;
      color: var(--secondary-text);
    }
    
    .spotify-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #1DB954;
      color: white;
      border: none;
      border-radius: 24px;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin: 0 auto;
      transition: background-color 0.2s ease;
    }
    
    .spotify-button:hover {
      background-color: #1ed760;
    }
    
    .spotify-icon {
      width: 24px;
      height: 24px;
    }
  `]
})
export class SpotifyLoginComponent {
  constructor(private spotifyService: SpotifyService) {}
  
  login() {
    this.spotifyService.authorize();
  }
}
