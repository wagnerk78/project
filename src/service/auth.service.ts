import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}`, user);
  }

  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }
}
