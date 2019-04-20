import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { QuizInfo } from '../../shared/models/quiz-info.model';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {

  @Input() quiz: QuizInfo;
  @Input() isAdmin: boolean;
  @Output() deleteQuizEmitter =  new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit() {
  }

  deleteQuiz(id) {
    this.deleteQuizEmitter.emit(id);
  }

}
