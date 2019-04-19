import { Component, OnInit, Input } from '@angular/core';
import { QuizInfo } from '../../shared/models/quiz-info.model';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {

  @Input() quiz: QuizInfo;
  @Input() isAdmin: boolean;

  constructor() { }

  ngOnInit() {
  }

}
