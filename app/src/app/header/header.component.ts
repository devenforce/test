import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentRoute: string = '';

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}

  isActive(path: string) {
    return this.currentRoute === path
  }
}
