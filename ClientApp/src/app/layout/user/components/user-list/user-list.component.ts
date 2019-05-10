import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { PuiSnackbarService } from 'app/shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service';
import { RoleService } from 'app/layout/role/services/role.service';
import { Role } from '../../models/role';
import { Pagination } from 'app/shared/models/pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService, RoleService],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends Pagination implements OnInit {

  select: number
  users: User[];
  user: User;
  displayedColumns: string[] = ['Gravatar', 'Nama', 'Nip', 'UserRoles'];
  dataSource: any;
  allRoles: Role[];

  @ViewChild("gravatar") gravatarTpl: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    public dialog: MatDialog,
    private snackbarService: PuiSnackbarService,
  ) {
    super()
  }

  /** Called by Angular after user-list component initialized */
  ngOnInit() {
    this.getData()
    this.roleService.getAll().subscribe(result => {
      this.allRoles = result
    })
  }

  getData(params: { [key: string]: any } = {}) {
    params = Object.assign(params, this.requestParams())
    this.userService.getUsers(params).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.listData)
      this.totalData = result.totalItems
      this.users = result.listData
      this.select = -1
    })
  }

  pageEvent(event: any) {
    this.offset = event.pageIndex
    this.getData()
  }

  highlight(index, row) {
    if (this.select != index) {
      this.select = index;
      this.user = row;
    } else {
      this.select = -1;
    }
  }

  onAddNewUserClick() {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        roles: this.allRoles
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userService.postNewUser(result).subscribe(result => {
          this.getData()
          this.snackbarService.showSnackBar("success", "Tambah User berhasil!");
          this.userService.getUsers().subscribe(result => {
          });
        });
      }
    });
  }

  onAssignRoleClick() {
    let dialogRef = this.dialog.open(UserDetailComponent, {
      data: {
        user: this.user,
        roles: this.allRoles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userService.postUserRoles(result).subscribe((response: User) => {
          // search user
          this.users = this.users.map(x => {
            if (x.UserId == response.UserId) {
              x = Object.assign({}, x, response);
            }
            return x;
          });
          this.getData()
          this.snackbarService.showSnackBar();
        });
      }
      //this.animal = result;
    });
  }

}
