import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  getBranches(): Observable<string[]> {
    return of(this.branches);
  }
}
