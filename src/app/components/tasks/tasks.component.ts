import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskRequest } from 'src/app/models/task-request';
import { TaskResponse } from 'src/app/models/task.response';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  newTaskString: string = "";
  tasks$?: Observable<TaskResponse[]>;

  constructor(private taskService: TaskService, private router: Router) {

  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask(): void {

  }

  updateTask(task: TaskRequest): void {

  }

  removeTask(task: TaskRequest): void {

  }

}
