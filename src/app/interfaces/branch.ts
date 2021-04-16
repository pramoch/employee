import { Status } from './common';

export interface BranchesResult {
  status: Status;
  data?: {
    branches: string[]
  };
}