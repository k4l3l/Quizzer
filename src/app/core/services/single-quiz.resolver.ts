import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class SingleQuizResolverService implements Resolve<any> {

  constructor(
    private quizService: QuizService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.quizService.fetchById(id);
  }
}
