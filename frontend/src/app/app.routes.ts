import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list';
import { AddTaskComponent } from './features/add-task/add-task';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent },
    { path: 'add-task', component: AddTaskComponent }
];
