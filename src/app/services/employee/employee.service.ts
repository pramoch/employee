import { Injectable } from '@angular/core';
import { Employee } from '../../interfaces/employee';
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
      joinDate: '01/06/2017',
      position: 'Officer',
      branch: 'London'
    },
    {
      id: '700102',
      name: 'Quinn',
      surname: 'Rivers',
      joinDate: '01/10/2015',
      position: 'Branch Manager',
      branch: 'London'
    },
    {
      id: '700103',
      name: 'Amelia',
      surname: 'Burrows',
      joinDate: '01/02/2018',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700104',
      name: 'Jacob',
      surname: 'Walsh',
      joinDate: '01/07/2015',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      id: '700105',
      name: 'Martha',
      surname: 'Hills',
      joinDate: '01/04/2015',
      position: 'Branch Manager',
      branch: 'Manchester'
    },
    {
      id: '700106',
      name: 'Tracy',
      surname: 'Robertson',
      joinDate: '01/02/2016',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700107',
      name: 'Harvey',
      surname: 'Longbottom',
      joinDate: '01/11/2017',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700108',
      name: 'Rinzee',
      surname: 'Wilma',
      joinDate: '01/04/2014',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700109',
      name: 'Clark',
      surname: 'Elsie',
      joinDate: '01/12/2019',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      id: '700110',
      name: 'Walker',
      surname: 'Kristen',
      joinDate: '01/01/2019',
      position: 'Branch Manager',
      branch: 'Oxford'
    }
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
}
