import { Component, OnInit } from '@angular/core';
import { ApplicationsService, IApplication } from '../applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  items: IApplication[] = [];
  loading: boolean = true;

  constructor(public applications: ApplicationsService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.loading = true;
    this.applications.getItems().subscribe( (data: any) => {
      if(data.results){
        this.items = data.results as IApplication[];
      }
    })
  }
}
