import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { BranchesComponent } from './components/branches/branches.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'sales', component: SalesComponent },
  { path: '',   redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
