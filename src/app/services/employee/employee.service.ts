import { Injectable } from '@angular/core';
import { Employee, EmployeeResult, Result } from '../../interfaces/employee';
import { Observable, of } from 'rxjs';

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
      branch: 'London'
    },
    {
      id: '700102',
      name: 'Quinn',
      surname: 'Rivers',
      mobileNo: '0896552310',
      salary: 30000,
      joinDate: '2015-10-01',
      position: 'Branch Manager',
      branch: 'London'
    },
    {
      id: '700103',
      name: 'Amelia',
      surname: 'Burrows',
      mobileNo: '0823335859',
      salary: 18000,
      joinDate: '2018-02-01',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700104',
      name: 'Jacob',
      surname: 'Walsh',
      mobileNo: '0864659874',
      salary: 17000,
      joinDate: '2015-07-01',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700105',
      name: 'Martha',
      surname: 'Hills',
      mobileNo: '0895557890',
      salary: 33000,
      joinDate: '2015-04-01',
      position: 'Branch Manager',
      branch: 'Manchester'
    },
    {
      id: '700106',
      name: 'Tracy',
      surname: 'Robertson',
      mobileNo: '0831129966',
      salary: 20000,
      joinDate: '2016-02-01',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700107',
      name: 'Harvey',
      surname: 'Longbottom',
      mobileNo: '0845671122',
      salary: 19000,
      joinDate: '2017-11-01',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700108',
      name: 'Rinzee',
      surname: 'Wilma',
      mobileNo: '0894453798',
      salary: 15000,
      joinDate: '2014-04-01',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700109',
      name: 'Clark',
      surname: 'Elsie',
      mobileNo: '0816962525',
      salary: 18000,
      joinDate: '2019-12-01',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700110',
      name: 'Walker',
      surname: 'Kristen',
      mobileNo: '0884662020',
      salary: 25000,
      joinDate: '2019-01-01',
      position: 'Branch Manager',
      branch: 'Oxford'
    },
    {
      id: '700111',
      name: 'Christine',
      surname: 'Mccarty',
      mobileNo: '0897750223',
      salary: 26000,
      joinDate: '2015-03-01',
      position: 'Branch Manager',
      branch: 'Bristol'
    },
    {
      id: '700112',
      name: 'Lacey',
      surname: 'O\'Ryan',
      mobileNo: '0819896547',
      salary: 15000,
      joinDate: '2016-04-01',
      position: 'Officer',
      branch: 'Bristol'
    },
    {
      id: '700113',
      name: 'Troy',
      surname: 'Bryant',
      mobileNo: '0861131447',
      salary: 16000,
      joinDate: '2018-01-01',
      position: 'Officer',
      branch: 'Bristol'
    },
    {
      id: '700114',
      name: 'Ellie',
      surname: 'Stewart',
      mobileNo: '0640509987',
      salary: 17000,
      joinDate: '2018-08-01',
      position: 'Officer',
      branch: 'Bristol'
    },
    {
      id: '700115',
      name: 'Velma',
      surname: 'Farmer',
      mobileNo: '0663456877',
      salary: 27000,
      joinDate: '2017-09-01',
      position: 'Branch Manager',
      branch: 'Birmingham'
    },
    {
      id: '700116',
      name: 'Nadia',
      surname: 'Pugh',
      mobileNo: '0692524467',
      salary: 17000,
      joinDate: '2019-10-01',
      position: 'Officer',
      branch: 'Birmingham'
    },
    {
      id: '700117',
      name: 'Charley',
      surname: 'Pratt',
      mobileNo: '0816450080',
      salary: 16000,
      joinDate: '2019-02-01',
      position: 'Officer',
      branch: 'Birmingham'
    }
  ];

  positions = [
    'Branch Manager',
    'Officer'
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

  getEmployees(term: string, limit: number, offset: number = 0): Observable<EmployeeResult> {
    let result: Employee[];
    let limitedResult: Employee[];

    if (term) {
      result = this.getEmployeesByName(term);
    }
    else {
      result = this.employees;
    }

    limitedResult = result.slice(offset, offset + limit);

    return of({
      employees: limitedResult,
      total: result.length
    });
  }

  getEmployeeById(id: string): Observable<Employee | null> {
    return of(this.employees.find(e => e.id === id) || null);
  }

  updateEmployeeById(id: string, emp: Employee): Observable<Result> {
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
    });
  }

  getPositions(): Observable<string[]> {
    return of(this.positions);
  }
}
