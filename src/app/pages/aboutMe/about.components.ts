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
  styles: []
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
      await new Promise(resolve => setTimeout(resolve, 50)); // Adjust typing speed here
    }
  }
}