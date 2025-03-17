import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl + '/weather';

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string = 'São Paulo', country: string = 'BR'): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`, {
      params: { city, country }
    }).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        
        // Return mock data for development if API fails
        return of(this.getMockWeatherData());
      })
    );
  }
  
  private getMockWeatherData(): any {
    return {
      coord: { lon: -46.6333, lat: -23.5478 },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      base: 'stations',
      main: {
        temp: 25.2,
        feels_like: 25.4,
        temp_min: 23.9,
        temp_max: 26.7,
        pressure: 1015,
        humidity: 65,
      },
      visibility: 10000,
      wind: {
        speed: 3.6,
        deg: 140,
      },
      clouds: {
        all: 20,
      },
      dt: 1616782800,
      sys: {
        type: 1,
        id: 8394,
        country: 'BR',
        sunrise: 1616752347,
        sunset: 1616795553,
      },
      timezone: -10800,
      id: 3448439,
      name: 'São Paulo',
      cod: 200,
    };
  }
}
