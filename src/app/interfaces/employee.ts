import { Status } from './common';

export interface Employee {
  id: string;
  name: string;
  surname: string;
  mobileNo: string;
  salary: number;
  joinDate: string | Date;
  position: string;
  branch: string;
}

export interface EmployeesResult {
  status: Status;
  data?: {
    employees: Employee[];
    total: number;
  };
}

export interface EmployeeResult {
  status: Status;
  data?: {
    employee: Employee
  };
}

export interface PositionsResult {
  status: Status;
  data?: {
    positions: string[]
  };
}
