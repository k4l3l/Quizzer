import { Question } from './question.model';

export interface Quiz {
    _id: string;
    name: string;
    category: string;
    questions: Array<Question>;
}
