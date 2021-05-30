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

    if (!this.branch.map) {
      // If map is available, loading screen will be hidden after IFrame is loaded
      this.dialog.hideLoading();
    }

    this.branchForm = this.fb.group({
      name: [this.branch.name, Validators.required],
      address: [this.branch.address, Validators.required],
      telNo: [this.branch.telNo, Validators.required],
      map: [this.branch.map]
    });
  }

  onIFrameLoaded(e: Event): void {
    if ((e.target as HTMLIFrameElement).src) {
      this.dialog.hideLoading();
    }
  }

  onEdit(): void {
    this.mode = 'edit';
  }

  onSave(): void {
    if (this.id) {
      const updatedBranch = {
        id: this.id,
        name: this.branchForm.value.name,
        address: this.branchForm.value.address,
        telNo: this.branchForm.value.telNo,
        map: this.branchForm.value.map
      }

      this.dialog.showLoading();

      this.branchService.updateBranchById(this.id, updatedBranch)
        .subscribe(result => {
          if (result.status.success && result.data) {
            this.setBranch(result.data.branch);
            this.mode = 'view';
          }
        });
    }
  }

  onCancel(): void {
    if (this.branchForm.dirty) {
      this.dialog.showConfirm({
        title: 'Quit editing?',
        msg: 'Changes you made so far will not be saved.',
        confirmText: 'Quit',
        cancelText: 'Keep editing'
      }).subscribe(result => {
        if (result) {
          this.setBranch(this.branch);
          this.quitEdit();
        }
      });
    }
    else {
      this.quitEdit();
    }
  }

  quitEdit(): void {
    if (this.branch.map) {
      this.dialog.showLoading();
    }

    this.mode = 'view';
  }
}
