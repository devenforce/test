import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from '../applications/applications.component';
import { NewApplicationComponent } from '../new-application/new-application.component';

const routes: Routes = [
  {path: 'applications', component: ApplicationsComponent, data: { section: 'applications'}, },
  {path: 'new-application', component: NewApplicationComponent, data: { section: 'new-application'}, },
  {path: '', redirectTo: 'new-application', pathMatch: 'full' },
  {path: '**', redirectTo: 'applications' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
