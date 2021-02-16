import { Injectable } from '@angular/core';
import { Employee, EmployeeResult } from '../../interfaces/employee';
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
      joinDate: '01/06/2017',
      position: 'Officer',
      branch: 'London'
    },
    {
      id: '700102',
      name: 'Quinn',
      surname: 'Rivers',
      mobileNo: '0896552310',
      salary: 30000,
      joinDate: '01/10/2015',
      position: 'Branch Manager',
      branch: 'London'
    },
    {
      id: '700103',
      name: 'Amelia',
      surname: 'Burrows',
      mobileNo: '0823335859',
      salary: 18000,
      joinDate: '01/02/2018',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700104',
      name: 'Jacob',
      surname: 'Walsh',
      mobileNo: '0864659874',
      salary: 17000,
      joinDate: '01/07/2015',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700105',
      name: 'Martha',
      surname: 'Hills',
      mobileNo: '0895557890',
      salary: 33000,
      joinDate: '01/04/2015',
      position: 'Branch Manager',
      branch: 'Manchester'
    },
    {
      id: '700106',
      name: 'Tracy',
      surname: 'Robertson',
      mobileNo: '0831129966',
      salary: 20000,
      joinDate: '01/02/2016',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700107',
      name: 'Harvey',
      surname: 'Longbottom',
      mobileNo: '0845671122',
      salary: 19000,
      joinDate: '01/11/2017',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700108',
      name: 'Rinzee',
      surname: 'Wilma',
      mobileNo: '0894453798',
      salary: 15000,
      joinDate: '01/04/2014',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700109',
      name: 'Clark',
      surname: 'Elsie',
      mobileNo: '0816962525',
      salary: 18000,
      joinDate: '01/12/2019',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700110',
      name: 'Walker',
      surname: 'Kristen',
      mobileNo: '0884662020',
      salary: 25000,
      joinDate: '01/01/2019',
      position: 'Branch Manager',
      branch: 'Oxford'
    }
  ];

  constructor() { }

  private getEmployeesByName(term: string): Employee[] {
    let result: Employee[];

    term = term.toLowerCase();

    result = this.employees.filter((emp) => {
      return emp.name.toLowerCase().includes(term) || emp.surname.toLowerCase().includes(term)
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
}
