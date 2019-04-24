import { TestBed } from '@angular/core/testing';

import { SingleQuizResolverService } from './single-quiz.resolver';

describe('SingleQuizResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleQuizResolverService = TestBed.get(SingleQuizResolverService);
    expect(service).toBeTruthy();
  });
});
