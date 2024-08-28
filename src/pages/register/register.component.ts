import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Injeta o Router no construtor
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/usuarios', this.registerForm.value).subscribe({
        next: (response) => {
          alert('Usuário cadastrado com sucesso!'); // Exibe a mensagem de sucesso
          this.router.navigate(['/usuarios/login']); // Redireciona para a tela de login
        },
        error: (error) => {
          console.error('Erro ao registrar usuário:', error);
          alert('Ocorreu um erro ao cadastrar o usuário. Tente novamente.'); // Mensagem de erro caso a requisição falhe
        },
      });
    }
  }
}
