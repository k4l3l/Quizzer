import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  questions;
  username: string;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar,
    ) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 10 && localStorage.getItem('quiz')) {
      this.username = localStorage.getItem('username');
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.updatedQs = JSON.parse(localStorage.getItem('qns'));

      this._subs.push(this.route.data.subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          let { questions } = data['aRes'];
          this.questions = questions;
      }));
      let questionsArr = [];
      this.quizService.updatedQs.forEach((q) => {
          questionsArr.push(q._id);
      });

      this.questions = this.questions.filter((q) => {
          return questionsArr.includes(q._id);
      });
      questionsArr = this.quizService.updatedQs.map(q => q._id);
      let sortedQs = [];
      this.questions.forEach((q)=> {
        let index = questionsArr.indexOf(q._id);
        sortedQs[index] = q;
      });

      this.questions.sort((a,b) => a._id < b._id);
      this.quizService.updatedQs.forEach((e, i) => {
          if (e.answer == sortedQs[i].answer) {
            this.quizService.correctAnswerCount++;
          }
          e.correct = sortedQs[i].answer;
      });
    } else {
      this.router.navigate(['/quiz/home']);
    }
  }


  onSubmit() {
    const quiz = localStorage.getItem('quiz');
    const time = this.quizService.displayTimeElapsed();
    const score = this.quizService.correctAnswerCount;
    this._subs.push(this.quizService.submitScore({quiz, time, score}).subscribe(() => {
      this.snackbar.open('Result submitted!', 'Close', {
        duration: 5000
      })
      this.router.navigate(['/quiz/home']);
    }));
  }

  restart() {
    this.location.back();
  }

  ngOnDestroy() {
    localStorage.removeItem('qnProgress');
    localStorage.removeItem('qns');
    localStorage.removeItem('seconds');
    localStorage.removeItem('quiz');
    this._subs.forEach(s => s.unsubscribe());
  }
}