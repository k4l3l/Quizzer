import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizInfo } from '../../shared/models/quiz-info.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit, OnDestroy {
  latestSub: Subscription;
  categoriesSub: Subscription;
  isAdminSub: Subscription;

  quizzes: QuizInfo[];
  categories = [];
  isAdmin = false;
  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.quizService.fetchCats();
    this.authService.initAuth();
    this.quizService.fetchQuizzes();

    this.isAdminSub = this.authService.isAdminStatus.subscribe((bool) => {
      this.isAdmin = bool;
    });
    this.categoriesSub = this.quizService.catsChanged.subscribe((data) => {
      this.categories = data;
    });
    this.latestSub = this.quizService.quizzesChanged.subscribe((data) => {
      this.quizzes = data;
    });
  }


  deleteQuiz(id) {
    this.quizService.deleteQuiz(id);
  }

  ngOnDestroy() {
    this.latestSub.unsubscribe();
    this.categoriesSub.unsubscribe();
    this.isAdminSub.unsubscribe();
    this.authService.cancelSubscriptions();
    this.quizService.cancelSubscriptions();
  }
}
