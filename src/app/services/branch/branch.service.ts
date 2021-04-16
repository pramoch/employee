import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BranchesResult } from '../../interfaces/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  branches = [
    'London',
    'Manchester',
    'Oxford',
    'Bristol',
    'Birmingham'
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
}
