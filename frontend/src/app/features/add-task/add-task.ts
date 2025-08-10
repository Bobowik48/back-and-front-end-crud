import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule] ,
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTaskComponent {
  form!: FormGroup;          // deklaracja pola
  submitting = false;
  error = '';
  constructor(private fb: FormBuilder, private tasks: TaskService, private router: Router) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submit() {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    const payload: Task = { title: this.form.value.title!, done: false };
    this.tasks.createTask(payload).subscribe({
      next: _ => this.router.navigate(['/tasks']),
      error: _ => { this.error = 'Nie udało się dodać zadania'; this.submitting = false; }
    });
  }
}
