import { Injectable } from '@angular/core';
import { Employee, EmployeesResult, EmployeeResult, PositionsResult } from '../../interfaces/employee';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [
    {
      id: '700101',
      name: 'Emma',
      surname: 'Cartner',
      mobileNo: '0815467890',
      salary: 15000,
      joinDate: '2017-06-01',
      position: 'Officer',
      branch: 'London - Oxford Street East'
    },
    {
      id: '700102',
      name: 'Quinn',
      surname: 'Rivers',
      mobileNo: '0896552310',
      salary: 30000,
      joinDate: '2015-10-01',
      position: 'Branch Manager',
      branch: 'London - Oxford Street East'
    },
    {
      id: '700103',
      name: 'Amelia',
      surname: 'Burrows',
      mobileNo: '0823335859',
      salary: 18000,
      joinDate: '2018-02-01',
      position: 'Officer',
      branch: 'Manchester - Trafford Centre'
    },
    {
      id: '700104',
      name: 'Jacob',
      surname: 'Walsh',
      mobileNo: '0864659874',
      salary: 17000,
      joinDate: '2015-07-01',
      position: 'Officer',
      branch: 'Manchester - Trafford Centre'
    },
    {
      id: '700105',
      name: 'Martha',
      surname: 'Hills',
      mobileNo: '0895557890',
      salary: 33000,
      joinDate: '2015-04-01',
      position: 'Branch Manager',
      branch: 'Manchester - Trafford Centre'
    },
    {
      id: '700106',
      name: 'Tracy',
      surname: 'Robertson',
      mobileNo: '0831129966',
      salary: 20000,
      joinDate: '2016-02-01',
      position: 'Officer',
      branch: 'York - Coppergate'
    },
    {
      id: '700107',
      name: 'Harvey',
      surname: 'Longbottom',
      mobileNo: '0845671122',
      salary: 19000,
      joinDate: '2017-11-01',
      position: 'Officer',
      branch: 'York - Coppergate'
    },
    {
      id: '700108',
      name: 'Rinzee',
      surname: 'Wilma',
      mobileNo: '0894453798',
      salary: 15000,
      joinDate: '2014-04-01',
      position: 'Officer',
      branch: 'York - Coppergate'
    },
    {
      id: '700109',
      name: 'Clark',
      surname: 'Elsie',
      mobileNo: '0816962525',
      salary: 18000,
      joinDate: '2019-12-01',
      position: 'Officer',
      branch: 'York - Coppergate'
    },
    {
      id: '700110',
      name: 'Walker',
      surname: 'Kristen',
      mobileNo: '0884662020',
      salary: 25000,
      joinDate: '2019-01-01',
      position: 'Branch Manager',
      branch: 'York - Coppergate'
    },
    {
      id: '700111',
      name: 'Christine',
      surname: 'Mccarty',
      mobileNo: '0897750223',
      salary: 26000,
      joinDate: '2015-03-01',
      position: 'Branch Manager',
      branch: 'Leeds - Trinity'
    },
    {
      id: '700112',
      name: 'Lacey',
      surname: 'O\'Ryan',
      mobileNo: '0819896547',
      salary: 15000,
      joinDate: '2016-04-01',
      position: 'Officer',
      branch: 'Leeds - Trinity'
    },
    {
      id: '700113',
      name: 'Troy',
      surname: 'Bryant',
      mobileNo: '0861131447',
      salary: 16000,
      joinDate: '2018-01-01',
      position: 'Officer',
      branch: 'Leeds - Trinity'
    },
    {
      id: '700114',
      name: 'Ellie',
      surname: 'Stewart',
      mobileNo: '0640509987',
      salary: 17000,
      joinDate: '2018-08-01',
      position: 'Officer',
      branch: 'Leeds - Trinity'
    },
    {
      id: '700115',
      name: 'Velma',
      surname: 'Farmer',
      mobileNo: '0663456877',
      salary: 27000,
      joinDate: '2017-09-01',
      position: 'Branch Manager',
      branch: 'Birmingham - Fort Parkway'
    },
    {
      id: '700116',
      name: 'Nadia',
      surname: 'Pugh',
      mobileNo: '0692524467',
      salary: 17000,
      joinDate: '2019-10-01',
      position: 'Officer',
      branch: 'Birmingham - Fort Parkway'
    },
    {
      id: '700117',
      name: 'Charley',
      surname: 'Pratt',
      mobileNo: '0816450080',
      salary: 16000,
      joinDate: '2019-02-01',
      position: 'Officer',
      branch: 'Birmingham - Fort Parkway'
    }
  ];

  positions = [
    'Officer',
    'Branch Manager'
  ];

  constructor() { }

  private getEmployeesByName(term: string): Employee[] {
    let result: Employee[];

    term = term.toLowerCase();

    result = this.employees.filter((emp) => {
      return emp.name.toLowerCase().includes(term) || emp.surname.toLowerCase().includes(term);
    });

    return result;
  }

  getEmployees(term: string, limit: number, offset: number = 0, sortBy = '', desc = false): Observable<EmployeesResult> {
    let result: Employee[];
    let limitedResult: Employee[];

    if (term) {
      result = this.getEmployeesByName(term);
    }
    else {
      result = [...this.employees];
    }

    if (sortBy) {
      result = result.sort((a: any, b: any) => {
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        else if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        else {
          return 0;
        }
      });
    }

    if (desc) {
      result = result.reverse();
    }

    limitedResult = result.slice(offset, offset + limit);

    return of({
      status: {
        success: true,
        desc: 'Success'
      },
      data: {
        employees: limitedResult,
        total: result.length
      }
    }).pipe(delay(300));
  }

  getEmployeeById(id: string): Observable<EmployeeResult> {
    const emp = this.employees.find(e => e.id === id);

    if (emp) {
      return of({
        status: {
          success: true,
          desc: 'success'
        },
        data: {
          employee: emp
        }
      }).pipe(delay(300));
    }
    else {
      return of({
        status: {
          success: false,
          desc: 'Employee not found'
        }
      });
    }
  }

  updateEmployeeById(id: string, emp: Employee): Observable<EmployeeResult> {
    const index = this.employees.findIndex(e => e.id === id);
    this.employees[index] = emp;

    return of({
      status: {
        success: true,
        desc: 'success'
      },
      data: {
        employee: emp
      }
    }).pipe(delay(300));
  }

  addEmployee(emp: Employee): Observable<EmployeeResult> {
    const latestId = this.employees[this.employees.length - 1].id;
    const newId = ((+latestId) + 1).toString();

    emp.id = newId;
    this.employees.push(emp);

    return of({
      status: {
        success: true,
        desc: 'success'
      },
      data: {
        employee: emp
      }
    }).pipe(delay(300));
  }

  getPositions(): Observable<PositionsResult> {
    return of({
      status: {
        success: true,
        desc: 'success'
      },
      data: {
        positions: this.positions
      }
    }).pipe(delay(300));
  }
}
