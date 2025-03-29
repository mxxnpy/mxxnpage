import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from '../../components/clock/clock.component';
import { GithubActivityComponent } from '../../components/github-activity/github-activity.component';
import { GithubContributionsComponent } from '../../components/github-contributions/github-contributions.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, ClockComponent, GithubActivityComponent, GithubContributionsComponent],
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
          
          <div class="status-section">
            <app-clock></app-clock>
          </div>
        </div>
        
        <div class="github-section">
          <h3 class="subsection-title">GitHub</h3>
          <div class="github-grid">
            <app-github-activity [username]="'mxxnpy'"></app-github-activity>
            <app-github-contributions [username]="'mxxnpy'"></app-github-contributions>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-me {
      margin-top: 2rem;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr;
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

    .status-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .github-section {
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

    .github-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .about-content {
        grid-template-columns: 1fr 1fr;
      }

      .github-grid {
        grid-template-columns: 1fr 1fr;
      }
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