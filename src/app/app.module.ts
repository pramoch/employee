import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { PhonePipe } from './pipes/phone/phone.pipe';
import { SalesComponent } from './components/sales/sales.component';

@NgModule({
  declarations: [
    PhonePipe,
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    EmployeesComponent,
    BranchesComponent,
    EmployeeDetailComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
