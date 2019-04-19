import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { QuizInfo } from '../../components/shared/models/quiz-info.model';

const QUIZ_URL = 'http://localhost:5000/quiz/';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _eventSubscriptions: Subscription[] = [];
  private latestQuizzes: QuizInfo[] = [];
  latestChanged = new BehaviorSubject<QuizInfo[]>([]);
  private _quizCats = [];
  catsChanged = new BehaviorSubject<Array<string>>([]);
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  fetchCats() {
    this._eventSubscriptions.push(this.http.get(QUIZ_URL + 'cats').subscribe((data) => {
      this._quizCats = data['cats'];
      this.catsChanged.next([...this._quizCats]);
    }));
  }

  createQuiz(quizData) {
    this._eventSubscriptions.push(this.http.post(QUIZ_URL + 'create', quizData).subscribe((data) => {
      this.snackBar.open(data['message'], 'Close', {
        duration: 5000
      });
      this.router.navigate(['/']);
    }));
  }

  deleteQuiz(quizId) {
    
  }

  fetchLatest() {
    this._eventSubscriptions.push(this.http.get(QUIZ_URL + 'latest').subscribe((data: QuizInfo[]) => {
      this.latestQuizzes = data;
      this.latestChanged.next([...this.latestQuizzes]);
    }));
  }

  cancelSubscriptions() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
  }
}
