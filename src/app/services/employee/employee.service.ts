import { Injectable } from '@angular/core';
import { Employee } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [
    {
      name: 'Emma',
      surname: 'Cartner',
      joinDate: '01/06/2017',
      position: 'Officer',
      branch: 'London'
    },
    {
      name: 'Quinn',
      surname: 'Rivers',
      joinDate: '01/10/2015',
      position: 'Branch Manager',
      branch: 'London'
    },
    {
      name: 'Amelia',
      surname: 'Burrows',
      joinDate: '01/02/2018',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      name: 'Jacob',
      surname: 'Walsh',
      joinDate: '01/07/2015',
      position: 'Officer',
      branch: 'Manchester'
    },
    {
      name: 'Martha',
      surname: 'Hills',
      joinDate: '01/04/2015',
      position: 'Branch Manager',
      branch: 'Manchester'
    },
    {
      name: 'Tracy',
      surname: 'Robertson',
      joinDate: '01/02/2016',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      name: 'Harvey',
      surname: 'Longbottom',
      joinDate: '01/11/2017',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      name: 'Rinzee',
      surname: 'Wilma',
      joinDate: '01/04/2014',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      name: 'Clark',
      surname: 'Elsie',
      joinDate: '01/12/2019',
      position: 'Officer',
      branch: 'Oxford'
    },
    {
      name: 'Walker',
      surname: 'Kristen',
      joinDate: '01/01/2019',
      position: 'Branch Manager',
      branch: 'Oxford'
    }
  ];

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }
}
