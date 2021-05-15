import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BranchesResult, BranchResult } from '../../interfaces/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  branches = [
    {
      id: '101',
      name: 'London',
      telNo: '0817472899',
      address: '14-28 Oxford Street, Fitzrovia, London, United Kingdom, W1D 1AU'
    },
    {
      id: '102',
      name: 'Manchester',
      telNo: '0896451090',
      address: '106, Market Street, Manchester, United Kingdom, M1 1WA'
    },
    {
      id: '103',
      name: 'Oxford',
      telNo: '0861141796',
      address: '201, The Westgate, Queen Street, Oxford, United Kingdom, OX1 1PE'
    },
    {
      id: '104',
      name: 'Bristol',
      telNo: '0815608189',
      address: '1, The Horsefair, Bristol, United Kingdom, BS1 3BB'
    },
    {
      id: '105',
      name: 'Birmingham',
      telNo: '0890648050',
      address: '38, High Street, Birmingham, United Kingdom, B4 7SL'
    }
  ];

  constructor() { }

  getBranches(): Observable<BranchesResult> {
    return of({
      status: {
        success: true,
        desc: 'success'
      },
      data: {
        branches: this.branches
      }
    }).pipe(delay(300));
  }

  getBranchById(id: string): Observable<BranchResult> {
    const branch = this.branches.find(b => b.id === id);

    if (branch) {
      return of({
        status: {
          success: true,
          desc: 'success'
        },
        data: {
          branch
        }
      }).pipe(delay(300));
    }
    else {
      return of({
        status: {
          success: false,
          desc: 'Branch not found'
        }
      });
    }
  }
}
