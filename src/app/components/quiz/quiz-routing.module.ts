import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { SingleQuizResolverService } from 'src/app/core/services/single-quiz.resolver';
import { AnswerResolver } from 'src/app/core/services/answer.resolver';
import { QuizHomeComponent } from './quiz-home/quiz-home.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const quizRoutes: Routes = [
        { path: 'create', component: CreateQuizComponent, canActivate: [ AdminGuard ] },
        { path: 'edit/:id', component: EditQuizComponent,
            resolve: { res: SingleQuizResolverService, aRes: AnswerResolver},
            canActivate: [ AdminGuard ]
        },
        { path: 'home', component: QuizHomeComponent },
        { path: 'result', component: QuizResultComponent, resolve: { aRes: AnswerResolver } },
        { path: ':id', component: QuizComponent, resolve: { res: SingleQuizResolverService} },
]

@NgModule({
    imports: [RouterModule.forChild(quizRoutes)],
    exports: [RouterModule],
    providers: [
      SingleQuizResolverService,
      AnswerResolver
    ]
  })
  export class QuizRoutingModule { }