// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Router
import { AppRoutingModule } from './app-routing.module';

// Material UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { BranchesComponent } from './components/branches/branches.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { PhonePipe } from './pipes/phone/phone.pipe';
import { SalesComponent } from './components/sales/sales.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BranchDetailComponent } from './components/branch-detail/branch-detail.component';

@NgModule({
  declarations: [
    PhonePipe,
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    EmployeesComponent,
    BranchesComponent,
    EmployeeDetailComponent,
    SalesComponent,
    DialogComponent,
    BranchDetailComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Router
    AppRoutingModule,
    // Material UI
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      disableClose: true,
      hasBackdrop: true
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
