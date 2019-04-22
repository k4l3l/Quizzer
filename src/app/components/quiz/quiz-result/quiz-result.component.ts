import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit, OnDestroy {
  answerSub: Subscription;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 10 && localStorage.getItem('quiz')) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.updatedQs = JSON.parse(localStorage.getItem('qns'));

      this.answerSub = this.quizService.getAnswers().subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          let qns = data['questions'];
          let questionsArr = [];
          this.quizService.updatedQs.forEach((q) => {
            questionsArr.push(q._id);
          });
          qns = qns.filter((q) => {
            return questionsArr.includes(q._id);
          });
          this.quizService.updatedQs.forEach((e, i) => {
            if (e.answer == data[i]) {
              this.quizService.correctAnswerCount++;
            }
            e.correct = data[i];
          });
          console.log(this.quizService.updatedQs);
        }
      );
    } else {
      this.router.navigate(['/quiz/home']);
    }
  }


  // OnSubmit() {
  //   this.quizService.submitScore().subscribe(() => {
  //     this.restart();
  //   });
  // }

  restart() {
    this.router.navigate(['/quiz/home']);
  }

  ngOnDestroy() {
    localStorage.removeItem('qnProgress');
    localStorage.removeItem('qns');
    localStorage.removeItem('seconds');
    localStorage.removeItem('quiz');
    this.answerSub.unsubscribe();
  }
}