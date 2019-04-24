import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Subscription } from 'rxjs';
import { QuizInfo } from '../../shared/models/quiz-info.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  quizzes: QuizInfo[];
  categories = [];
  isAdmin = false;
  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.quizService.fetchCats();
    this.authService.initAuth();
    this.quizService.fetchQuizzes();

    this._subs.push(this.authService.isAdminStatus.subscribe((bool) => {
      this.isAdmin = bool;
    }));
    this._subs.push(this.quizService.catsChanged.subscribe((data) => {
      this.categories = data;
    }));
    this._subs.push(this.quizService.quizzesChanged.subscribe((data) => {
      this.quizzes = data;
    }));
  }

  onFilterQuizzes(category) {
    this.quizService.filterQuizzes(category);
  }

  onResetFilter() {
    this.quizService.resetFilter();
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {_id: data.id, name: data.name}
    });
    const sub = dialogRef.componentInstance.onDelete.subscribe((data) => {
      this.deleteQuiz(data);
      dialogRef.close();
    });
    this._subs.push(dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    }));
  }

  deleteQuiz(id) {
    this.quizService.deleteQuiz(id);
  }

  ngOnDestroy() {
    this._subs.forEach(s => s.unsubscribe());
    this.authService.cancelSubscriptions();
    this.quizService.cancelSubscriptions();
  }
}
