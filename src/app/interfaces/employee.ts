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

export interface EmployeeResult {
  employees: Employee[];
  total: number;
}

export interface Result {
  status: {
    success: boolean;
    desc: string;
  };
  data: {
    employee: Employee
  };
}
