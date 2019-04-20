import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  quizSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public quizService: QuizService
    ) { }

  ngOnInit() {
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    const id = this.route.snapshot.params.id;
    this.quizSub = this.quizService.fetchById(id).subscribe((data) => {
      this.quizService.quiz = data['Quiz'];
      this.quizService.updatedQs = data['updatedQs'];
      this.quizService.progressRatio = (100 / this.quizService.updatedQs.length);
      this.start();
    });
  }

  start() {
    localStorage.setItem('quiz', this.quizService.quiz._id);
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000);
  }

  answer(qnId, choice) {
    this.quizService.updatedQs[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.updatedQs));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == this.quizService.updatedQs.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/quiz/result']);
    }
  }

  ngOnDestroy() {
    clearInterval(this.quizService.timer);
    this.quizSub.unsubscribe();
  }
}
