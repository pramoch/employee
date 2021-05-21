import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  mode = 'view';
  branchForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private dialog: DialogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dialog.showLoading();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.branchService.getBranchById(this.id)
        .subscribe(result => {
          if (result.status.success && result.data) {
            // loading screen will be hidden in onIFrameLoaded
            this.setBranch(result.data.branch);
          }
          else {
            this.dialog.hideLoading();

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

  setBranch(branch: Branch ): void {
    if (branch) {
      this.branch = branch;
    }

    this.branchForm = this.fb.group({
      name: [this.branch.name, Validators.required],
      address: [this.branch.address, Validators.required],
      telNo: [this.branch.telNo, Validators.required],
      map: [this.branch.map]
    })
  }

  onIFrameLoaded(): void {
    if (this.branch.map) {
      this.dialog.hideLoading();
    }
  }

  onEdit(): void {
    this.mode = 'edit';
  }

  onSave(): void {
    console.log('save');
  }

  onCancel(): void {
    console.log('cancel');
    this.quitEdit();
  }

  quitEdit(): void {
    this.mode = 'view';
  }
}
