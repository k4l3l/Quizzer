import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../shared/models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit, OnDestroy {
  _subs: Subscription[] = [];
  quiz: Quiz;
  quizForm: FormGroup;
  questions: FormArray;
  categories: string[];
  answers;
  id: string;

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.quizService.fetchCats();
    this._subs.push(this.quizService.catsChanged.subscribe((cats) => {
      this.categories = cats;
    }));

    this.id = this.route.snapshot.params['id'];

    localStorage.setItem('quiz', this.id);

    this._subs.push(this.route.data.subscribe((data) => {
      const {Quiz} = data['res'];
      const {questions} = data['aRes'];
      this.answers = questions;
      this.quiz = Quiz;
    }));

    this.quizForm = this.fb.group({
      name: [this.quiz.name, [ Validators.required, Validators.minLength(5) ]],
      category: [this.quiz.category, [ Validators.required ]],
      description: [this.quiz.description, [ Validators.required, Validators.minLength(10) ]],
      questions: this.fb.array([], Validators.minLength(10))
     });

     const questions = this.quiz.questions.map((q, i) => {
       return {...q, answer: this.answers[i].answer}
     })

     this.initForm(questions);
  }

  initForm(data) {
    const formArr = this.quizForm.get('questions') as FormArray;
    data.forEach(item => {
      formArr.push(this.createQuestion(item));
    });
  }

  editQuiz() {
    this.quizService.editQuiz(this.id, this.quizForm.value);
  }

  createQuestion(question?) {
    if (question === undefined) {
      return this.fb.group({
        text: ['', [ Validators.required ]],
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        answer: ['', Validators.required]
      });
    } else {
      return this.fb.group({
        text: [question.text, [ Validators.required ]],
        option1: [question.option1, Validators.required],
        option2: [question.option2, Validators.required],
        option3: [question.option3, Validators.required],
        option4: [question.option4, Validators.required],
        answer: [question.answer, Validators.required]
      });
    }
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
    this._subs.forEach((s) => s.unsubscribe);
  }
}
