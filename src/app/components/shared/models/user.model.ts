import { Result } from './result.model';

export interface User {
    email: string;
    username: string,
    results: Result[]
}