import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee';
import { BranchService } from '../../services/branch/branch.service';

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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private branchService: BranchService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(e => {
        if (e) {
          this.emp = e;
          this.emp.joinDate = new Date(this.emp.joinDate);
        }
      });
    }

    this.employeeService.getPositions().subscribe(p => {
      this.positions = p;
    });

    this.branchService.getBranches().subscribe(b => {
      this.branches = b;
      console.log(this.branches);
    });
  }

  onEdit(): void {
    this.mode = 'edit';
  }

  onSave(): void {
    this.mode = 'view';
  }

  onCancel(): void {
    this.mode = 'view';
  }
}
