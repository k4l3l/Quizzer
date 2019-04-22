import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit, OnDestroy {
  quizForm: FormGroup;
  questions: FormArray;
  categories: string[];
  catsSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
  ) { }

  ngOnInit() {
    this.quizService.fetchCats();
    this.catsSub = this.quizService.catsChanged.subscribe((cats) => {
      this.categories = cats;
    });
    this.quizForm = this.fb.group({
     name: ['', [ Validators.required, Validators.minLength(5) ]],
     category: ['', [ Validators.required ]],
     description: ['', [ Validators.required, Validators.minLength(10) ]],
     questions: this.fb.array([this.createQuestion()], Validators.minLength(10))
    });
  }

  createQuiz() {
    this.quizService.createQuiz(this.quizForm.value);
  }

  createQuestion() {
    return this.fb.group({
      text: ['', [ Validators.required ]],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  addQuestion(): void {
    this.questions = this.quizForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }

  removeQuestion(): void {
    if (this.questions) {
      this.questions.removeAt(this.questions.length - 1);
    }
  }

  ngOnDestroy() {
    this.catsSub.unsubscribe();
    this.quizService.cancelSubscriptions();
  }

}
