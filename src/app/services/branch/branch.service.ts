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
      address: '14-28 Oxford Street, Fitzrovia, London, United Kingdom, W1D 1AU',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.821152965032!2d-0.1333185843218955!3d51.5164970796365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2d6d3d31ef%3A0xdc4d3a5c5c2cf957!2sPrimark!5e0!3m2!1sen!2sth!4v1621166728366!5m2!1sen!2sth'
    },
    {
      id: '102',
      name: 'Manchester - Trafford Centre',
      telNo: '0896451090',
      address: 'Barton Square, Intu Trafford Centre, Manchester, United Kingdom, M17 8AS',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.125448073627!2d-2.34380808424521!3d53.46621808000435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487baf4ff0f48d5d%3A0x3072634e564fb929!2sPrimark!5e0!3m2!1sen!2sth!4v1621168896069!5m2!1sen!2sth'
    },
    {
      id: '103',
      name: 'York - Coppergate',
      telNo: '0861141796',
      address: '19-20, Coppergate Shopping Centre, York, United Kingdom, YO1 9NT',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2347.551648337937!2d-1.0819994842255831!3d53.95747098011167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487931aedf553ecf%3A0xded77a2f88ee4966!2sPrimark!5e0!3m2!1sen!2sth!4v1621169016458!5m2!1sen!2sth'
    },
    {
      id: '104',
      name: 'Leeds - Trinity',
      telNo: '0815608189',
      address: 'Albion Street, Leeds, United Kingdom, LS1 5AT',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.611194053331!2d-1.5480532842320414!3d53.796407280075854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c1ec7ecaf7b%3A0xa83eeedfbd4b6bcd!2sPrimark!5e0!3m2!1sen!2sth!4v1621169066598!5m2!1sen!2sth'
    },
    {
      id: '105',
      name: 'Birmingham - Fort Parkway',
      telNo: '0890648050',
      address: '1B-3A, The Fort Shopping Centre, Fort Parkway, Birmingham, United Kingdom, B24 9FP',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.3770000093978!2d-1.8235319842831341!3d52.508516079812104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bad06911d7f9%3A0x109fe3949693db40!2sPrimark!5e0!3m2!1sen!2sth!4v1621169109174!5m2!1sen!2sth'
    }
  ];

  constructor() { }

  getBranches(sortBy = '', desc = false): Observable<BranchesResult> {
    let result = [...this.branches];

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

    return of({
      status: {
        success: true,
        desc: 'success'
      },
      data: {
        branches: result
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
