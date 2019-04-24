import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  randoms = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public quizService: QuizService
    ) { }

  ngOnInit() {
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.route.data.subscribe((data) => {
      const {Quiz, updatedQs} = data.res;
      this.quizService.quiz = Quiz;
      this.quizService.updatedQs = updatedQs;
      this.start();
      this.randomizeQs();
    });
  }

  randomizeQs() {
    const randomNums = [];
    let num, already = new Object;

    const start = 0, end = this.quizService.updatedQs.length;

    for (let i = 0; i < 10;) {
          num = (Math.random() * (end - start) + start) ^ 0;
          if (!(num in already)) {
              already[num] = num;
              i++;
              randomNums.push(num);
          }
      }
    randomNums.forEach((n) => {
        this.randoms.push(this.quizService.updatedQs[n]);
      });
  }

  start() {
    localStorage.setItem('quiz', this.quizService.quiz._id);
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  answer(qnId, choice) {
    this.randoms[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.randoms));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/quiz/result']);
    }
  }

  ngOnDestroy() {
    clearInterval(this.quizService.timer);
  }
}
