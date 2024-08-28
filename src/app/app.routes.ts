import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { TasksComponent } from '../pages/tasks/tasks.component';

export const routes: Routes = [
  { path: 'usuarios', component: RegisterComponent },
  { path: 'usuarios/login', component: LoginComponent },
  { path: 'tarefas', component: TasksComponent },
  { path: '', redirectTo: '/usuarios/login', pathMatch: 'full' },
];
