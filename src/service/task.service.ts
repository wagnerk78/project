import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tarefas';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  createTask(task: any) {
    return this.http.post<any>(this.apiUrl, task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  markTaskAsDone(taskId: string) {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}`, { done: true }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
