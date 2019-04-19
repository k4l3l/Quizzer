import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    category: string;
    questions: Array<Question>;
}
