import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyPlayerComponent } from '../../components/spotify-player/spotify-player.component';
import { SpotifyTopTracksComponent } from '../../components/spotify-top-tracks/spotify-top-tracks.component';
import { SpotifyTopArtistsComponent } from '../../components/spotify-top-artists/spotify-top-artists.component';
import { SpotifyPlaylistsComponent } from '../../components/spotify-playlists/spotify-playlists.component';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [
    CommonModule,
    SpotifyPlayerComponent,
    SpotifyTopTracksComponent,
    SpotifyTopArtistsComponent,
    SpotifyPlaylistsComponent
  ],
  template: `
    <h1 class="page-title">Spotify</h1>
    
    <section class="spotify-section">
      <app-spotify-player></app-spotify-player>
    </section>
    
    <section class="spotify-section">
      <app-spotify-top-tracks></app-spotify-top-tracks>
    </section>
    
    <section class="spotify-section">
      <app-spotify-top-artists></app-spotify-top-artists>
    </section>
    
    <section class="spotify-section">
      <app-spotify-playlists></app-spotify-playlists>
    </section>
  `,
  styles: [`
    .page-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      letter-spacing: -0.03em;
    }
    
    .spotify-section {
      margin-bottom: 2.5rem;
    }
    
    @media (max-width: 650px) {
      .page-title {
        font-size: 1.75rem;
        margin-bottom: 1.25rem;
      }
      
      .spotify-section {
        margin-bottom: 2rem;
      }
    }
  `]
})
export class SpotifyComponent {
  // No additional functionality needed for this component
}
