import { Component, Directive, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validator, ValidationErrors, AsyncValidator, Validators, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, timer } from 'rxjs';
import { ApplicationsService, IApplicationHobby, IApplication } from '../applications.service';
import * as moment from 'moment'

export const checkEmail = function (applications: ApplicationsService): AsyncValidatorFn {
  const delay = 2000;
  let subscription: Subscription;
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const p = new Promise<any>( (resolve, reject) => {
      if(!control.value) return resolve(null);
      if(subscription && !subscription.closed) subscription.unsubscribe();
      applications.checkEmail(control.value).toPromise().then( (data: any) => {
        const t = timer(delay);
        subscription = t.subscribe( val => {
          if(data.exists){
            return resolve({exists: data.exists, existsMessage: data.message})
          }
          return resolve(null)
        });
      })
      .catch((err) => resolve({ exists: true, emailCheckMessage: err.error.message}));
    });
    return p;
  }
};

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit {
  currentFramework: string = '';
  error: string = '';
  framework: string[] = Object.keys(frameworkVersions);
  frameworks = frameworkVersions;
  hobbyes: IApplicationHobby[] = [];
  sended = false;
  constructor(public applicationsService: ApplicationsService, public router: Router) { }

  applicationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    framework: new FormControl('', [Validators.required]),
    frameworkVersion: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required], [checkEmail(this.applicationsService)]),
  });

  hobbyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  send(){
    if(this.applicationForm.invalid){
      this.error = 'Данные формы введены некоректно'
      return;
    }
    const form = this.applicationForm.value;
    this.applicationsService.addItem({
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: moment(form.dateOfBirth).format('YYYY-MM-DD'),
      email: form.email,
      framework: form.framework,
      frameworkVersion: form.frameworkVersion,
      hobbyes: this.hobbyes,
    }).subscribe( (data: any ) => {
      this.sended = true;
    }, (err) => {
        this.error = err.message
      }
    )
  }

  removeHobby(item: IApplicationHobby){
    let i = this.hobbyes.findIndex(hobby => hobby === item);
    if(i >= 0) this.hobbyes.splice(i, 1);
  };

  addHobby(){
    if(this.hobbyForm.invalid) return;
    const form = this.hobbyForm.value;
    this.hobbyes.push({
      name: form.name,
      duration: form.duration,
    });
    this.hobbyForm.reset()
  }
}

export const frameworkVersions: { [propName: string]: string[] } = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
}
