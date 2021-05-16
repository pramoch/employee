import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Branch } from '../../interfaces/branch';

// Services
import { BranchService } from '../../services/branch/branch.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.scss']
})
export class BranchDetailComponent implements OnInit {
  id: string | null = null;
  branch: Branch = {
    id: '',
    name: '',
    address: '',
    telNo: '',
    map: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.dialog.showLoading();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.branchService.getBranchById(this.id)
        .subscribe(result => {
          this.dialog.hideLoading();

          if (result.status.success && result.data) {
            this.branch = result.data.branch;
          }
          else {
            this.dialog.showConfirm({
              title: 'Error',
              msg: result.status.desc,
              confirmText: 'OK'
            }).subscribe(() => {
              this.router.navigate(['branches']);
            });
          }
        });
    }
  }
}
