import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="status-item">
      <svg *ngIf="isNightTime()" viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
      </svg>
      <svg *ngIf="!isNightTime()" viewBox="0 0 24 24" width="24" height="24" class="icon">
        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
      </svg>
      {{ formattedDate }}
      <span *ngIf="holidayMessage" class="holiday-message">— {{ holidayMessage }}</span>
    </p>
  `,
  styles: [`
    .holiday-message {
      font-weight: 600;
      margin-left: 0.5rem;
      color: var(--accent-color);
    }
  `]
})
export class ClockComponent implements OnInit {
  currentDate = new Date();
  formattedDate = '';
  holidayMessage = '';
  
  // Define holiday dates
  private holidays = {
    christmas: { day: 25, month: 12, message: 'Merry Christmas!' },
    newYear: { day: 1, month: 1, message: 'Happy New Year!' },
    leandroBirthday: { day: 23, month: 4, message: 'Happy Birthday, Leandro!' },
    victorBirthday: { day: 27, month: 11, message: 'Happy Birthday, Victor!' },
    brazilIndependence: { day: 7, month: 9, message: 'Happy Independence Day, Brazil!' },
    laborDay: { day: 1, month: 5, message: 'Happy Labor Day!' },
    carnival: { day: 13, month: 2, message: 'Happy Carnival!' },
    blackConsciousness: { day: 20, month: 11, message: 'Black Consciousness Day!' },
    // Adding today's date for testing
    today: { day: new Date().getDate(), month: new Date().getMonth() + 1, message: 'Today is a special day!' },
  };
  
  ngOnInit() {
    // Update time every second
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }
  
  updateTime() {
    this.currentDate = new Date();
    this.formattedDate = this.formatDate(this.currentDate);
    this.holidayMessage = this.getHolidayMessage(this.currentDate);
  }
  
  formatDate(date: Date): string {
    // Format date with correct timezone for Brazil (UTC-3)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/Sao_Paulo'
    };
    
    return date.toLocaleDateString('en-US', options);
  }
  
  getHolidayMessage(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    
    for (const [holiday, data] of Object.entries(this.holidays)) {
      if (day === data.day && month === data.month) {
        return data.message;
      }
    }
    
    return '';
  }
  
  isNightTime(): boolean {
    // Get hour in Brazil timezone
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      hour12: false,
      timeZone: 'America/Sao_Paulo'
    };
    
    const timeString = this.currentDate.toLocaleString('en-US', options);
    const hour = parseInt(timeString.split(':')[0], 10);
    
    return hour < 6 || hour >= 20; // Consider night time between 8 PM and 6 AM
  }
}
