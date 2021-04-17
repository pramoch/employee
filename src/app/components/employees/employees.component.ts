import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee';
import { PageEvent } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  searchTerms: Subject<string> = new Subject<string>();
  pageIndex = 0;
  pageSize = 10;
  totalEmployees = 0;
  term = '';
  @ViewChild('searchBox') input!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged()

    ).subscribe(term => {
      this.term = term;
      this.pageIndex = 0;
      this.updateEmployees();
    });

    this.updateEmployees();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onPageChanged(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.updateEmployees();
  }

  private updateEmployees(): void {
    this.dialog.showLoading();

    this.employeeService.getEmployees(this.term, this.pageSize, this.pageIndex * this.pageSize).subscribe(result => {
      this.dialog.hideLoading();

      if (result.status.success && result.data) {
        this.employees = result.data.employees;
        this.totalEmployees = result.data.total;
      }

      this.input.nativeElement.focus();
    });
  }
}
