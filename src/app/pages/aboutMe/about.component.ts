import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubActivityComponent } from '../../components/github-activity/github-activity.component';
import { SpotifyWorkHoursComponent } from '../../components/spotify-work-hours/spotify-work-hours.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, GithubActivityComponent, SpotifyWorkHoursComponent],
  animations: [
    trigger('typingAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <section class="about-me">
      <h2 class="section-title">Sobre Mim</h2>
      
      <div class="about-content">
        <div class="personal-info">
          <p class="description" #description [@typingAnimation]>
            Olá! Sou um desenvolvedor apaixonado por tecnologia, com foco em desenvolvimento web e soluções inovadoras.
          </p>
        </div>
        
        <div class="github-section">
          <h3 class="subsection-title">GitHub Activity</h3>
          <div class="github-activity-container">
            <app-github-activity [username]="'mxxnpy'"></app-github-activity>
          </div>
        </div>
        
        <div class="spotify-stats">
          <h3 class="subsection-title">Spotify Work Hours</h3>
          <app-spotify-work-hours></app-spotify-work-hours>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-me {
      margin-top: 2rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .about-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 1rem;
    }

    .personal-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .github-section,
    .spotify-stats {
      background-color: var(--card-background);
      padding: 1.5rem;
      border-radius: 8px;
    }

    .subsection-title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
    }

    .github-activity-container {
      display: flex;
      justify-content: center;
    }

    .spotify-stats {
      margin-top: 2rem;
    }
  `]
})
export class AboutMeComponent implements OnInit {
  @ViewChild('description') descriptionElement!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
    this.animateDescription();
  }

  private async animateDescription() {
    const text = 'Olá! Sou um desenvolvedor apaixonado por tecnologia, com foco em desenvolvimento web e soluções inovadoras.';
    const descriptionElement = this.descriptionElement.nativeElement;
    descriptionElement.textContent = '';

    for (let i = 0; i < text.length; i++) {
      descriptionElement.textContent += text[i];
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}