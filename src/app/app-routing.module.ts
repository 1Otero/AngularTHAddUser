import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddUserComponent} from './components/add-user/add-user.component'
import {ListUserComponent} from './components/list-user/list-user.component'

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/all'
},{
  path: 'all',

  component: ListUserComponent
},{
  path: 'add',
  component: AddUserComponent
},{
  path: 'modify/:Id',
  component: AddUserComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
