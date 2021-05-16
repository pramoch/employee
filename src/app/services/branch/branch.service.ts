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
      name: 'London - Oxford Street East',
      telNo: '0817472899',
      address: '14-28 Oxford Street, Fitzrovia, London, United Kingdom, W1D 1AU'
    },
    {
      id: '102',
      name: 'Manchester - Trafford Centre',
      telNo: '0896451090',
      address: 'Barton Square, Intu Trafford Centre, Manchester, United Kingdom, M17 8AS'
    },
    {
      id: '103',
      name: 'York - Coppergate',
      telNo: '0861141796',
      address: '19-20, Coppergate Shopping Centre, York, United Kingdom, YO1 9NT'
    },
    {
      id: '104',
      name: 'Leeds - Trinity',
      telNo: '0815608189',
      address: 'Albion Street, Leeds, United Kingdom, LS1 5AT'
    },
    {
      id: '105',
      name: 'Birmingham - Fort Parkway',
      telNo: '0890648050',
      address: '1B-3A, The Fort Shopping Centre, Fort Parkway, Birmingham, United Kingdom, B24 9FP'
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
