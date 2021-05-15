import { Status } from './common';

export interface Branch {
  id: string;
  name: string;
  address: string;
  telNo: string;
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
