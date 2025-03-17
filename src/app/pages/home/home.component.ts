import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from '../../components/clock/clock.component';
import { WeatherComponent } from '../../components/weather/weather.component';
import { GithubContributionsComponent } from '../../components/github-contributions/github-contributions.component';
import { DiscordStatusComponent } from '../../components/discord-status/discord-status.component';
import { SpotifyPlayerComponent } from '../../components/spotify-player/spotify-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ClockComponent,
    WeatherComponent,
    GithubContributionsComponent,
    DiscordStatusComponent,
    SpotifyPlayerComponent
  ],
  template: `
    <div>
      <div class="status-section">
        <app-clock></app-clock>
        <app-weather></app-weather>
      </div>
      
      <div class="status-section">
        <app-spotify-player></app-spotify-player>
      </div>
      
      <div class="status-section">
        <app-github-contributions username="mxxnpy"></app-github-contributions>
      </div>
      
      <div class="status-section">
        <app-discord-status></app-discord-status>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
