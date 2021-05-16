import { Status } from './common';

export interface Branch {
  id: string;
  name: string;
  telNo: string;
  address: string;
  map: string;
}

export interface BranchesResult {
  status: Status;
  data?: {
    branches: Branch[]
  };
}

export interface BranchResult {
  status: Status;
  data?: {
    branch: Branch
  };
}
