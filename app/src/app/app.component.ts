import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  currentRoute: string = ''

  constructor(public route: ActivatedRoute, public router: Router){
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void { }


}
