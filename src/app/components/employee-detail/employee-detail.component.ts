import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Employee } from '../../interfaces/employee';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

// Services
import { EmployeeService } from '../../services/employee/employee.service';
import { BranchService } from '../../services/branch/branch.service';
import { DialogService } from '../../services/dialog/dialog.service';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  emp: Employee = {
    id: '',
    name: '',
    surname: '',
    mobileNo: '',
    salary: 0,
    joinDate: '',
    position: '',
    branch: ''
  };
  mode = 'view';
  positions: string[] = [];
  branches: string[] = [];
  employeeForm!: FormGroup;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.dialog.showLoading();

    const obsArray: any = [
      this.employeeService.getPositions(),
      this.branchService.getBranches()
    ];

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      if (this.id === 'add') {
        this.mode = 'add';
      }
      else {
        obsArray.push(this.employeeService.getEmployeeById(this.id));
      }

      forkJoin(obsArray).subscribe((values) => {
        this.dialog.hideLoading();

        // Positions
        const positionsResult: any = values[0];
        if (positionsResult.status.success && positionsResult.data) {
          this.positions = positionsResult.data.positions;
        }

        // Branches
        const branchesResult: any = values[1];
        if (branchesResult.status.success && branchesResult.data) {
          this.branches = branchesResult.data.branches;
        }

        // Employee
        const employeeResult: any = values[2];
        if (employeeResult) {
          if (employeeResult.status.success && employeeResult.data) {
            this.setEmployee(employeeResult.data.employee);
          }
          else {
            this.dialog.showConfirm({
              title: 'Error',
              msg: employeeResult.status.desc,
              confirmText: 'OK'
            }).subscribe(() => {
              this.router.navigate(['employees']);
            });
          }
        }
        else {
          // add mode
          this.setEmployee(this.emp);
        }
      });
    }
  }

  setEmployee(emp: Employee | null): void {
    if (emp) {
      this.emp = emp;
    }

    let momentDate = this.emp.joinDate ? moment(this.emp.joinDate) : moment().startOf('day');

    this.employeeForm = this.fb.group({
      name: [this.emp.name, Validators.required],
      surname: [this.emp.surname, Validators.required],
      mobileNo: [this.emp.mobileNo, Validators.required],
      salary: [this.emp.salary, Validators.required],
      position: [this.emp.position || this.positions[0]],
      branch: [this.emp.branch || this.branches[0]],
      joinDate: [momentDate, Validators.required]
    });
  }

  onEdit(): void {
    this.mode = 'edit';
  }

  onSave(): void {
    if (this.id) {
      const updatedEmployee = {
        id: this.id,
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        mobileNo: this.employeeForm.value.mobileNo,
        salary: this.employeeForm.value.salary,
        joinDate: this.employeeForm.value.joinDate.format('YYYY-MM-DD'),
        position: this.employeeForm.value.position,
        branch:  this.employeeForm.value.branch
      };

      this.dialog.showLoading();

      this.employeeService
        .updateEmployeeById(this.id, updatedEmployee)
        .subscribe(result => {
          this.dialog.hideLoading();

          if (result.status.success && result.data) {
            this.setEmployee(result.data.employee);
            this.mode = 'view';
          }
        });
    }
  }

  onCancel(): void {
    if (this.employeeForm.dirty) {
      this.dialog.showConfirm({
        title: 'Quit editing?',
        msg: 'Changes you made so far will not be saved.',
        confirmText: 'Quit',
        cancelText: 'Keep editing'
      }).subscribe(result => {
        if (result) {
          this.setEmployee(this.emp);
          this.quitEdit();
        }
      });
    }
    else {
      this.quitEdit();
    }
  }

  quitEdit(): void {
    if (this.mode === 'edit') {
      this.mode = 'view';
    }
    else if (this.mode === 'add') {
      this.router.navigate(['employees']);
    }
  }
}
