import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PuiSnackbarService } from 'app/shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service';
import { Pegawai } from '../../models/pegawai';
import { Role } from '../../models/role';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserService]
})
export class UserFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    private uService: UserService,
    private snackbar: PuiSnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Pegawai;
  roles: Role[];
  nipStr: string;

  ngOnInit() {
    this.roles = this.data.roles;
    this.model = null;
  }

  onFindPegawaiClick() {
    if (this.nipStr != null) {
      this.uService.getPegawaiByNip(this.nipStr).subscribe(result => {
        if (result != null) {
          let isSuccess: boolean = result.isSuccessful;

          if (isSuccess) {
            this.model = result.data;
          } else {
            this.model = {} as Pegawai;
            this.snackbar.showSnackBar('info', 'Pegawai tidak ditemukan');
          }
        } else {

        }
      }, 
      error => { // error path
        this.snackbar.showSnackBar('info', 'Pegawai tidak ditemukan');
      }
      );
    }
  }

  onAddUserClick() {
    this.dialogRef.close(this.model);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
