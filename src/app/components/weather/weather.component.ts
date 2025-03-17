import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="status-item" *ngIf="!loading && !error">
      <svg viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path *ngIf="weatherIcon === 'clear'" fill="currentColor" d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
        
        <path *ngIf="weatherIcon === 'clouds'" fill="currentColor" d="M19.19,12.07C19.69,11.54 20,10.82 20,10C20,8.3 18.7,6.84 17,6.84C16.93,6.84 16.86,6.84 16.79,6.85C16.27,4.68 14.34,3 12,3C9.66,3 7.73,4.68 7.21,6.85C7.14,6.84 7.07,6.84 7,6.84C5.3,6.84 4,8.3 4,10C4,10.82 4.31,11.54 4.81,12.07C3.17,12.25 2,13.54 2,15C2,16.65 3.35,18 5,18H19C20.65,18 22,16.65 22,15C22,13.54 20.82,12.25 19.19,12.07M19,16H5C4.45,16 4,15.55 4,15C4,14.45 4.45,14 5,14H6.13C6.76,14 7.29,13.47 7.29,12.83C7.29,12.25 6.88,11.76 6.3,11.7C5.87,11.65 5.53,11.37 5.37,11C5.21,10.57 5.29,10.08 5.62,9.76C5.93,9.45 6.44,9.36 6.87,9.57C7.38,9.82 8.12,9.67 8.29,9.25C8.58,8.58 8.91,7.29 10.17,7.05C11.92,6.72 12.94,7.33 13.29,8.22C13.64,9.1 13.18,10.14 12.79,10.8C12.5,11.29 12.56,11.85 12.77,12.26C13.04,12.79 13.62,13 14.2,13H19C19.55,13 20,13.45 20,14C20,14.55 19.55,15 19,15" />
        
        <path *ngIf="weatherIcon === 'rain'" fill="currentColor" d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.93,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.93,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.93,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z" />
        
        <path *ngIf="weatherIcon === 'snow'" fill="currentColor" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
      </svg>
      {{ weatherText }}
    </p>
    
    <p class="status-item" *ngIf="loading">Loading weather data...</p>
    <p class="status-item error" *ngIf="error">{{ error }}</p>
  `,
  styles: []
})
export class WeatherComponent implements OnInit {
  weatherText = '';
  weatherIcon = 'clear';
  loading = true;
  error: string | null = null;
  
  constructor(private weatherService: WeatherService) {}
  
  ngOnInit() {
    this.getWeather();
  }
  
  getWeather() {
    this.loading = true;
    this.error = null;
    
    this.weatherService.getCurrentWeather('São Paulo', 'BR').subscribe({
      next: (data) => {
        if (data) {
          const temp = Math.round(data.main.temp);
          const description = data.weather[0].description;
          this.weatherText = `${temp}°C and ${description} in São Paulo`;
          this.setWeatherIcon(data.weather[0].main);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.error = 'Failed to load weather data';
        this.loading = false;
      }
    });
  }
  
  setWeatherIcon(weatherMain: string) {
    const main = weatherMain.toLowerCase();
    if (main.includes('clear')) {
      this.weatherIcon = 'clear';
    } else if (main.includes('cloud')) {
      this.weatherIcon = 'clouds';
    } else if (main.includes('rain') || main.includes('drizzle')) {
      this.weatherIcon = 'rain';
    } else if (main.includes('snow')) {
      this.weatherIcon = 'snow';
    } else {
      this.weatherIcon = 'clear'; // Default
    }
  }
}
