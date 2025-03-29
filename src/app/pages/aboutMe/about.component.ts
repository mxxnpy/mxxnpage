import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyWorkHoursComponent } from '../../components/spotify-work-hours/spotify-work-hours.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, SpotifyWorkHoursComponent],
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

        <div class="tech-grid">
          <div class="tech-item">
            <img src="assets/icons/Python.svg" alt="Python" class="tech-icon">
            <span>Python</span>
          </div>
          <div class="tech-item">
            <img src="assets/icons/JavaScript.svg" alt="JavaScript" class="tech-icon">
            <span>JavaScript</span>
          </div>
          <div class="tech-item">
            <img src="assets/icons/TypeScript.svg" alt="TypeScript" class="tech-icon">
            <span>TypeScript</span>
          </div>
          <div class="tech-item">
            <img src="assets/icons/C# (CSharp).svg" alt="C#" class="tech-icon">
            <span>C#</span>
          </div>
        </div>

        <div class="frameworks-grid">
          <div class="framework-item">
            <img src="assets/icons/Nest.js.svg" alt="NestJS" class="tech-icon">
            <span>NestJS</span>
          </div>
          <div class="framework-item">
            <img src="assets/icons/Node.js.svg" alt="Node.js" class="tech-icon">
            <span>Node.js</span>
          </div>
          <div class="framework-item">
            <img src="assets/icons/Angular.svg" alt="Angular" class="tech-icon">
            <span>Angular</span>
          </div>
          <div class="framework-item">
            <img src="assets/icons/Django.svg" alt="Django" class="tech-icon">
            <span>Django</span>
          </div>
          <div class="framework-item">
            <img src="assets/icons/NET core.svg" alt="ASP.NET" class="tech-icon">
            <span>ASP.NET</span>
          </div>
        </div>

        <div class="data-grid">
          <div class="data-item">
            <img src="assets/icons/SQLite.svg" alt="SQLite" class="tech-icon">
            <span>SQLite</span>
          </div>
          <div class="data-item">
            <img src="assets/icons/PostgresSQL.svg" alt="PostgreSQL" class="tech-icon">
            <span>PostgreSQL</span>
          </div>
          <div class="data-item">
            <img src="assets/icons/Google Cloud.svg" alt="BigQuery" class="tech-icon">
            <span>BigQuery</span>
          </div>
          <div class="data-item">
            <img src="assets/icons/GraphQL.svg" alt="GraphQL" class="tech-icon">
            <span>GraphQL</span>
          </div>
        </div>

        <div class="tools-grid">
          <div class="tool-item">
            <img src="assets/icons/Docker.svg" alt="Docker" class="tech-icon">
            <span>Docker</span>
          </div>
          <div class="tool-item">
            <img src="assets/icons/Git.svg" alt="Git" class="tech-icon">
            <span>Git</span>
          </div>
          <div class="tool-item">
            <img src="assets/icons/github.svg" alt="GitHub" class="tech-icon">
            <span>GitHub</span>
          </div>
          <div class="tool-item">
            <img src="assets/icons/Visual Studio Code (VS Code).svg" alt="VS Code" class="tech-icon">
            <span>VS Code</span>
          </div>
          <div class="tool-item">
            <img src="assets/icons/Postman.svg" alt="Postman" class="tech-icon">
            <span>Postman</span>
          </div>
        </div>
      </div>

      <div class="spotify-stats">
        <h3 class="subsection-title">Spotify Work Hours</h3>
        <app-spotify-work-hours></app-spotify-work-hours>
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

    .tech-section,
    .frameworks-section,
    .data-section,
    .tools-section,
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

    .tech-grid,
    .frameworks-grid,
    .data-grid,
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      padding: 1rem 0;
    }

    .tech-item,
    .framework-item,
    .data-item,
    .tool-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 8px;
      transition: transform 0.2s;
    }

    .tech-item:hover,
    .framework-item:hover,
    .data-item:hover,
    .tool-item:hover {
      transform: translateY(-2px);
    }

    .tool-icon {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }

    .spotify-stats {
      margin-top: 2rem;
      padding: 1.5rem;
      background-color: var(--card-background);
      border-radius: 8px;
    }

    .spotify-stats h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
    }
  `]
})
export class AboutMeComponent implements OnInit {
  @ViewChild('description') descriptionElement!: ElementRef;

  constructor() {}

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