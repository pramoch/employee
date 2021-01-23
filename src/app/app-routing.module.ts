import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { BranchesComponent } from './branches/branches.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'branches', component: BranchesComponent },
  { path: '',   redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
