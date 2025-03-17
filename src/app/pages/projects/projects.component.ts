import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  imageUrl?: string;
  icon?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="container">
      <h1>Projects</h1>
      <p class="subtitle">A list of all the projects I've worked on or I'm currently working on.</p>
      
      <div class="projects-list">
        <div class="project-item" *ngFor="let project of projects">
          <div class="project-icon" *ngIf="project.icon">
            <img [src]="project.icon" [alt]="project.title + ' icon'">
          </div>
          <div class="project-content">
            <div class="project-title">
              {{ project.title }}
              <a *ngIf="project.link" [href]="project.link" target="_blank" class="external-link">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
              </a>
            </div>
            <div class="project-description">{{ project.description }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      margin-bottom: 24px;
      font-weight: 300;
    }
    
    .project-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .project-card mat-card-content {
      flex-grow: 1;
    }
    
    .tech-stack {
      margin-top: 16px;
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'React', 'Node.js'],
      icon: '/assets/icons/discord.svg'
    },
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'Next.js', 'React'],
      icon: '/assets/icons/globe.svg'
    },
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'Discord API'],
      icon: '/assets/icons/search.svg'
    },
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'Discord.js', 'Philips Hue API'],
      icon: '/assets/icons/lightbulb.svg'
    },
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'Angular', 'Spotify API'],
      icon: '/assets/icons/spotify.svg'
    },
    {
      title: 'Sample Project',
      description: 'Sample Description',
      technologies: ['TypeScript', 'React', 'Philips Hue API'],
      icon: '/assets/icons/lightbulb.svg'
    }
  ];
}
