import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { QuizInfo } from '../../components/shared/models/quiz-info.model';
import { Quiz } from 'src/app/components/shared/models/quiz.model';

const QUIZ_URL = 'http://localhost:5000/quiz/';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _eventSubscriptions: Subscription[] = [];
  private quizzes: QuizInfo[] = [];
  quiz: Quiz;
  updatedQs: any;
  progressRatio;
  correctAnswerCount: number;
  seconds: number;
  timer;
  qnProgress: number;
  quizzesChanged = new BehaviorSubject<QuizInfo[]>([]);


  private _quizCats = [];
  catsChanged = new BehaviorSubject<Array<string>>([]);
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  displayTimeElapsed() {
    return ('0' + Math.floor(this.seconds / 3600)).slice(-2) + 'h:' + 
    ('0' + Math.floor(this.seconds / 60)).slice(-2) + 'm:' + 
    ('0' + Math.floor(this.seconds % 60)).slice(-2) + 's';
  }

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
      this.router.navigate(['/quiz/home']);
    }));
  }

  deleteQuiz(quizId) {
    this._eventSubscriptions.push(this.http.delete(QUIZ_URL + 'delete/' + quizId).subscribe((data) => {
      if (data['success'] === true) {
        this.snackBar.open('Quiz successfully deleted!', 'Close', {
          duration: 5000,
        });
        this.fetchQuizzes();
      }
    }));
  }

  fetchQuizzes() {
    this._eventSubscriptions.push(this.http.get(QUIZ_URL + 'all').subscribe((data: QuizInfo[]) => {
      this.quizzes = data;
      this.quizzesChanged.next([...this.quizzes]);
    }));
  }

  fetchById(id) {
    return this.http.get(QUIZ_URL + id);
  }

  getAnswers() {
    let body = { _id: localStorage.getItem('quiz') };
    return this.http.post(QUIZ_URL + 'answers', body);
  }

  cancelSubscriptions() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
  }
}
