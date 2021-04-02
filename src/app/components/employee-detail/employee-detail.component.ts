import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee';
import { BranchService } from '../../services/branch/branch.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(e => {
        if (e) {
          this.emp = e;
        }

        this.employeeForm = this.fb.group({
          name: [this.emp.name, Validators.required],
          surname: [this.emp.surname, Validators.required],
          mobileNo: [this.emp.mobileNo, Validators.required],
          salary: [this.emp.salary, Validators.required],
          position: [this.emp.position],
          branch: [this.emp.branch],
          joinDate: [moment(this.emp.joinDate), Validators.required]
        })
      });
    }

    this.employeeService.getPositions().subscribe(p => {
      this.positions = p;
    });

    this.branchService.getBranches().subscribe(b => {
      this.branches = b;
    });
  }

  onEdit(): void {
    this.mode = 'edit';
  }

  onSave(): void {
    this.mode = 'view';
    // console.log(this.employeeForm.value);
  }

  onCancel(): void {
    this.mode = 'view';
  }
}
