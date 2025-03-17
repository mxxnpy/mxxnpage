/**
 * Theme utility functions for the application
 */

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): void {
  const body = document.querySelector('body');
  if (body) {
    body.classList.toggle('light-theme');
    
    // Save preference to localStorage
    const isDarkTheme = !body.classList.contains('light-theme');
    localStorage.setItem('darkTheme', isDarkTheme.toString());
  }
}

/**
 * Initializes theme based on saved preference or system preference
 */
export function initializeTheme(): void {
  const body = document.querySelector('body');
  if (body) {
    // Check localStorage first
    const savedTheme = localStorage.getItem('darkTheme');
    
    if (savedTheme !== null) {
      // Use saved preference
      const isDarkTheme = savedTheme === 'true';
      if (!isDarkTheme) {
        body.classList.add('light-theme');
      }
    } else {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!prefersDark) {
        body.classList.add('light-theme');
      }
    }
  }
}
