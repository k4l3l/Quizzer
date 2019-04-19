import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { CreateQuizComponent } from './components/quiz/create-quiz/create-quiz.component';
import { QuizHomeComponent } from './components/quiz/quiz-home/quiz-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quiz', children: [
    { path: 'create', component: CreateQuizComponent },
    { path: 'home', component: QuizHomeComponent },
  ]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
