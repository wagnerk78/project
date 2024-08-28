import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // URL base do seu back-end

  constructor(private http: HttpClient) { }

  // Método para registrar um usuário
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, user);
  }

  // Método para login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, credentials);
  }

  // Método para obter tarefas
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarefas`);
  }

  // Método para adicionar uma tarefa
  addTask(task: { description: string; priority: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarefas`, task);
  }

  // Método para marcar uma tarefa como concluída
  completeTask(taskId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tarefas/${taskId}`, { completed: true });
  }
}
