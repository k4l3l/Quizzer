import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizHomeComponent } from './quiz-home/quiz-home.component';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

@NgModule({
    declarations: [
        CreateQuizComponent,
        QuizHomeComponent,
        QuizInfoComponent,
        QuizComponent,
        QuizResultComponent,
        EditQuizComponent,
        DeleteDialogComponent
    ],
    imports: [
        CommonModule,
        QuizRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    exports: [

    ],
    entryComponents: [
        DeleteDialogComponent
    ],
    providers: [ AdminGuard ]
})
export class QuizModule { }
