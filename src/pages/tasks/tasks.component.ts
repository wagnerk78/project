import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  taskForm: FormGroup;
  token: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.taskForm = this.fb.group({
      descricao: ['', Validators.required],
      prioridade: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Acesse o token apenas quando no navegador
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.loadTasks();
    }
  }

  loadTasks() {
    if (!this.token) return; // Se o token não existir, sair

    this.http.get<any[]>('http://localhost:3000/tarefas', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    }).pipe(
      catchError(error => {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas. Verifique sua conexão ou tente novamente.');
        return of([]); // Retorna uma lista vazia em caso de erro
      })
    ).subscribe(data => this.tasks = data);
  }

  addTask() {
    if (this.taskForm.valid && this.token) {
      this.http.post('http://localhost:3000/tarefas', this.taskForm.value, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      }).pipe(
        catchError(error => {
          console.error('Erro ao adicionar tarefa:', error);
          alert('Erro ao adicionar tarefa. Verifique sua conexão ou tente novamente.');
          return of(null); // Retorna null em caso de erro
        })
      ).subscribe(response => {
        if (response) {
          this.loadTasks();
          this.taskForm.reset();
        }
      });
    }
  }

  completeTask(taskId: string) {
    if (!this.token) return;

    this.http.patch(`http://localhost:3000/tarefas/${taskId}/complete`, null, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    }).pipe(
      catchError(error => {
        console.error('Erro ao completar tarefa:', error);
        alert('Erro ao completar tarefa. Verifique sua conexão ou tente novamente.');
        return of(null);
      })
    ).subscribe(() => this.loadTasks());
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/usuarios/login';
    }
  }
}
