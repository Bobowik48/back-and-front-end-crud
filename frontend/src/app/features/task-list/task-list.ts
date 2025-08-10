import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  loading = true;
  error = '';

  submitting = false;

  form!: FormGroup;
  editId: number | null = null;
  editTitle = '';
  saving = false;

  constructor(private fb: FormBuilder, private tasksSvc: TaskService) {}

  ngOnInit(): void {
    this.load();
    this.form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]]
  });
  }
  load() {
    this.loading = true;
    this.tasksSvc.getTasks().subscribe({
      next: t => { this.tasks = t; this.loading = false; },
      error: () => { this.error = 'Nie udało się pobrać zadań'; this.loading = false; }
    });
  }
  addTask() {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    const payload: Task = { title: this.form.value.title!, done: false };
    this.tasksSvc.createTask(payload).subscribe({
      next: _ => {
        this.form.reset();
        this.submitting = false;
        this.load(); // odśwież listę
      },
      error: _ => {
        this.error = 'Nie udało się dodać zadania';
        this.submitting = false;
      }
    });
  }
  toggleDone(task: Task) {
  const updatedTask = { ...task, done: !task.done };
  this.tasksSvc.updateTask(updatedTask).subscribe({
    next: _ => this.load(),
    error: _ => this.error = 'Nie udało się zaktualizować zadania'
  });
}

removeTask(task: Task) {
  if (!confirm('Na pewno usunąć to zadanie?')) return;
  this.tasksSvc.deleteTask(task.id!).subscribe({
    next: _ => this.load(),
    error: _ => this.error = 'Nie udało się usunąć zadania'
  });
  }
  startEdit(task: Task) {
  this.editId = task.id!;
  this.editTitle = task.title;
}

cancelEdit() {
  this.editId = null;
  this.editTitle = '';
}

ssaveEdit(task: Task) {
  const title = this.editTitle.trim();
  if (!title) { this.error = 'Tytuł nie może być pusty'; return; }

  this.saving = true;
  const updated: Task = { ...task, title };

  this.tasksSvc.updateTask(updated).subscribe({
    next: _ => { 
      this.saving = false; 
      this.editId = null; 
      this.editTitle = ''; 
      this.load();
    },
    error: _ => { 
      this.saving = false; 
      this.error = 'Nie udało się zapisać zmian'; 
    }
  });
}
}
