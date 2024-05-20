import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './Layouts/home-layout/home-layout.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomePageComponent }],
  },
];
