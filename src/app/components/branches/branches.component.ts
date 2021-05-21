import { Component, OnInit } from '@angular/core';

import { Branch } from '../../interfaces/branch';

// Services
import { BranchService } from '../../services/branch/branch.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  defaultSortBy = 'name';
  sortBy = this.defaultSortBy;
  desc = false;

  constructor(
    private branchService: BranchService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.updateBranches();
  }

  sort(sortBy: string): void {
    if (this.sortBy === sortBy) {
      if (this.desc) {
        this.sortBy = this.defaultSortBy;
      }

      this.desc = !this.desc;
    }
    else {
      this.sortBy = sortBy;
      this.desc = false;
    }

    this.updateBranches();
  }

  private updateBranches(): void {
    this.dialog.showLoading();

    this.branchService.getBranches(this.sortBy, this.desc)
      .subscribe(result => {
        this.dialog.hideLoading();

        if (result.status.success && result.data) {
          this.branches = result.data.branches;
        }
      });
  }
}
