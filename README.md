# QuizzerApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Basic info

This is a simple app for quiz/test challenges, built with Angular, Express MongoDB and Angular Material.

## Features
CRUD on Quizzes
Engaging quiz questions
Saving results in the db

## Views/Pages
Anonymous users as well as registered can access home, login and register

Quiz section:
Accessed only by authenticated users.
The section is divided into quiz homepage where all quizzes are listed. There is a filter by categories.
Here, the admin can edit and delete quizzes.
There is a start quiz button which leads users to the quiz page, where 10 randomly selected questions are taken from the db and displayed in random order with 4 possible answers. Questions are displayed one after another not all at once. When user completes the last question page navigates to quiz result 
where all correct answers are shown. User can either submit score and save it to his db entry or restart.

Create quiz:
Accessed only by authorized users/admins.
Dynamically generated questions input fields with add and delete question button. 
When all requirements are met the create quiz button is enabled and when clicked quiz is created.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
