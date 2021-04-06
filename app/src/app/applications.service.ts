import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService implements OnInit {

  url: string = '/api/applications'
  error: string = ''

  constructor(public http: HttpClient) {

  }

  ngOnInit(): void {

  }

  getItems(){
    return this.http.get(this.url);
  }

  addItem(data: IApplication){
    return this.http.post(this.url, data );
  }

  checkEmail(email: string) {
    return this.http.get(`${this.url}/check-email/${email}`);
  }
}

export interface IApplication{
  id?: number
  firstName: string
  lastName: string
  dateOfBirth: string
  framework: string
  frameworkVersion: string
  email: string
  hobbyes?: IApplicationHobby[]
}

export interface IApplicationHobby{
  id?: number
  name: string
  duration: string
}
