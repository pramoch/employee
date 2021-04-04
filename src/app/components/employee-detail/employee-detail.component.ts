import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee';
import { BranchService } from '../../services/branch/branch.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

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
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.employeeService.getEmployeeById(this.id).subscribe(e => {
        this.setEmployee(e);
      });
    }

    this.employeeService.getPositions().subscribe(p => {
      this.positions = p;
    });

    this.branchService.getBranches().subscribe(b => {
      this.branches = b;
    });
  }

  setEmployee(emp: Employee | null): void {
    if (emp) {
      this.emp = emp;
    }

    this.employeeForm = this.fb.group({
      name: [this.emp.name],
      surname: [this.emp.surname],
      mobileNo: [this.emp.mobileNo],
      salary: [this.emp.salary],
      position: [this.emp.position],
      branch: [this.emp.branch],
      joinDate: [moment(this.emp.joinDate)]
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

      this.employeeService
        .updateEmployeeById(this.id, updatedEmployee)
        .subscribe(result => {
          if (result.status.success) {
            this.setEmployee(result.data.employee);
            this.mode = 'view';
          }
        });
    }
  }

  onCancel(): void {
    this.mode = 'view';
  }
}
