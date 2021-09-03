import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHikeComponent } from './components/add-hike/add-hike.component';
import { HikesComponent } from './components/hikes/hikes.component';
import { ProgressComponent } from './components/progress/progress.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProgressComponent
  },
  {
    path: 'hikes',
    component: HikesComponent
  },
  {
    path: 'hikes/add',
    component: AddHikeComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
