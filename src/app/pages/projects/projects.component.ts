import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  icon?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Projects</h1>
      <p class="subtitle">A list of all the projects I've worked on or I'm currently working on.</p>
      
      <div class="projects-list">
        <a 
          class="project-card" 
          *ngFor="let project of projects" 
          [href]="project.link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div class="project-icon-box">
            <img [src]="project.icon" [alt]="project.title + ' icon'">
          </div>
          <div class="project-content">
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-description">{{ project.description }}</p>
            <p class="project-stack">{{ project.technologies.join(', ') }}</p>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    h1 {
      margin-bottom: 24px;
      font-weight: 300;
    }

    .subtitle {
      margin-bottom: 40px;
      font-size: 1.1rem;
      color: #666;
    }

    .projects-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .project-card {
      display: flex;
      align-items: center;
      text-decoration: none;
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      color: #fff;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    .project-icon-box {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #333;
      border-radius: 8px;
      margin-right: 20px;
    }

    .project-icon-box img {
      width: 48px;
      height: 48px;
    }

    .project-content {
      flex-grow: 1;
      text-align: left;
    }

    .project-title {
      font-size: 1.25rem;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .project-description {
      font-size: 1rem;
      margin-bottom: 12px;
      color: #ccc;
    }

    .project-stack {
      font-size: 0.9rem;
      color: #888;
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'This Site!',
      description: 'A personal portfolio website showcasing my projects and skills.',
      technologies: ['Angular', 'NestJS', 'TypeScript'],
      link: 'https://github.com/mxxnpy/mxxnpage',
      icon: '/mxxnpage/assets/icons/TypeScript.svg'
    },
    {
      title: 'Adopt A Cat!',
      description: 'A web application that allows users to adopt cats from local shelters.',
      technologies: ['C#', 'SQLite', 'ASP.NET Core'],
      link: 'https://github.com/mxxnpy/adopt-a-cat',
      icon: '/mxxnpage/assets/icons/Csharp.svg' 
    }
  ];
}