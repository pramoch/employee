import { Component, OnInit } from '@angular/core';

// Services
import { BranchService } from '../../services/branch/branch.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: string[] = [];

  constructor(
    private branchService: BranchService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.dialog.showLoading();

    this.branchService.getBranches()
      .subscribe(result => {
        this.dialog.hideLoading();

        if (result.status.success && result.data) {
          this.branches = result.data.branches;
        }
      });
  }
}
