import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(true);
  darkTheme$ = this.darkTheme.asObservable();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Initializes theme based on saved preference or system preference
   */
  private initializeTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem('darkTheme');
    
    if (savedTheme !== null) {
      // Use saved preference
      const isDarkTheme = savedTheme === 'true';
      this.darkTheme.next(isDarkTheme);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkTheme.next(prefersDark);
    }
    
    this.applyTheme();
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    const newValue = !this.darkTheme.value;
    this.darkTheme.next(newValue);
    localStorage.setItem('darkTheme', newValue.toString());
    this.applyTheme();
  }

  /**
   * Applies the current theme to the document
   */
  private applyTheme(): void {
    const body = document.querySelector('body');
    if (body) {
      if (this.darkTheme.value) {
        body.classList.remove('light-theme');
      } else {
        body.classList.add('light-theme');
      }
    }
  }
}
