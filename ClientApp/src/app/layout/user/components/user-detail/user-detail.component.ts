import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  allRoles: Role[];
  selected: any[];

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.allRoles = [];
    // get all
    let userRoles = this.data.user.UserRoles; 
    this.allRoles = this.compareRoles(userRoles, this.data.roles);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.data.user.UserRoles = this.selected;
    this.dialogRef.close(this.data.user);
  }

  selectChange(list: any) {
    this.selected = list.selectedOptions.selected.map(
      (item: any) => item.value
    );
  }

  compareRoles(userRoles: string[], defaultRoles: Role[]): Role[] {
    var result: Role[];
    result = [];

    for (let role of defaultRoles) {
      let newRole: Role = {
        RoleId: role.RoleId,
        RoleName: role.RoleName,
        IsChecked: false
      };

      for (let userRole of userRoles) {
        if (role.RoleName == userRole) {
          newRole.IsChecked = true;
        }
      }

      result.push(newRole);
    }

    return result;
  }

}
