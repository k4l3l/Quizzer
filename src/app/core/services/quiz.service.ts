import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { QuizInfo } from '../../components/shared/models/quiz-info.model';
import { Quiz } from 'src/app/components/shared/models/quiz.model';
import { Question } from 'src/app/components/shared/models/question.model';

const QUIZ_URL = 'http://localhost:5000/quiz/';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _eventSubscriptions: Subscription[] = [];
  private quizzes: QuizInfo[] = [];
  private filtered: QuizInfo[] = [];
  quiz: Quiz;
  updatedQs: Question[];
  // quizChanged = new BehaviorSubject<Quiz>(this.quiz);
  // updatedQsChanged = new BehaviorSubject<Array<any>>(this.updatedQs);
  correctAnswerCount: number;
  seconds: number;
  timer;
  qnProgress: number;
  quizzesChanged = new BehaviorSubject<QuizInfo[]>([]);
  private _quizCats = [];
  catsChanged = new BehaviorSubject<Array<string>>(this._quizCats);

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

  editQuiz(quizId, body) {
    this._eventSubscriptions.push(this.http.post(QUIZ_URL + 'edit/' + quizId, body).subscribe((data) => {
      if (data['success'] === true) {
        this.snackBar.open('Quiz successfully edited!', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/quiz/home']);
      }
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

  filterQuizzes(category) {
    this.filtered = this.quizzes.filter(q => q.category === category);
    this.quizzesChanged.next([...this.filtered]);
  }

  resetFilter() {
    this.quizzesChanged.next([...this.quizzes]);
  }

  fetchQuizzes() {
    this._eventSubscriptions.push(this.http.get(QUIZ_URL + 'all').subscribe((data: QuizInfo[]) => {
      this.quizzes = data;
      this.quizzesChanged.next([...this.quizzes]);
    }));
  }

  fetchById(id) {
    return this.http.get(QUIZ_URL + id);
    // .subscribe((data: Quiz) => {
    //   this.quiz = data['Quiz'];
    //   this.updatedQs = data['updatedQs']
    //   this.quizChanged.next({...this.quiz});
    //   this.updatedQsChanged.next([...this.updatedQs]);
    // });
  }

  getAnswers(_id?) {
    let body = { _id: localStorage.getItem('quiz') };
    return this.http.post(QUIZ_URL + 'answers', _id? {_id} : body);
  }

  submitScore(data) {
    return this.http.post(QUIZ_URL + 'result', data);
  }

  cancelSubscriptions() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
  }
}
