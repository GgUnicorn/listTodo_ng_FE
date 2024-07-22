import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'listTodo';

  tasks: any = [];
  newtask = '';

  APIURL = 'http://localhost:5147/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_tasks();
  }

  get_tasks() {
    this.http.get(this.APIURL + 'get_tasks').subscribe(
      (res) => {
        this.tasks = res;
      },

      (error) => {
        console.error('Error fetching tasks: ', error);
      }
    );
  }

  add_task() {
    let body = new FormData();
    body.append('task', this.newtask);
    this.http.post(this.APIURL + 'add_tasks', body).subscribe(
      (res) => {
        this.newtask = '';
        this.get_tasks();
        alert(res);
      },

      (error) => {
        console.error('Error fetching tasks: ', error);
      }
    );
  }

  edit_task(id: any) {
    const newTask = prompt('Edit task: ', '');
    if (newTask != null) {
      let body = new FormData();
      body.append('id', id);
      body.append('task', newTask);

      this.http.put(this.APIURL + 'edit_task', body).subscribe(
        (res) => {
          this.get_tasks();
          alert(res);
        },

        (error) => {
          console.error('Error fetching tasks: ', error);
        }
      );
    }
  }

  delete_task(id: any) {
    let body = new FormData();
    body.append('id', id);
    this.http.post(this.APIURL + 'delete_task', body).subscribe(
      (res) => {
        this.get_tasks();
        alert(res);
      },

      (error) => {
        console.error('Error updating task: ', error);
      }
    );
  }
}
