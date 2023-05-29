import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TaskRequest } from '../models/task-request';
import { TaskResponse } from '../models/task.response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly httpClient: HttpClient) { }

  //get tasks
  getTasks(): Observable<TaskResponse[]> {
    return this.httpClient.get<TaskResponse[]>(`${environment.apiUrl}/Tasks/list`);
  }

  getTaskById(taskId: Number): Observable<TaskResponse>{

  return this.httpClient.get<TaskResponse>(`${environment.apiUrl}/Tasks/details/${taskId}`);
  }

  //update
  updateTask(taskRequest: TaskRequest) {
    return this.httpClient.post<TaskResponse>(
      `${environment.apiUrl}/tasks/update`,
      taskRequest
    );
  }

  //add
  addTask(taskRequest: TaskRequest) {
    return this.httpClient.post<TaskResponse>(
      `${environment.apiUrl}/tasks/add`,
      taskRequest
    );
  }
  //delete
  deleteTask(taskId: Int32Array) {
    return this.httpClient.post(
      `${environment.apiUrl}/tasks/delete`,
      taskId
    );
  }
}
