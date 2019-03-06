import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { UserFormComponent } from '../user-form/user-form.component';
import { PuiSnackbarService } from 'app/shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service';
import { Pagination } from 'app/shared/models/pagination';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  users: User[];
  temp: User[];
  selected: any[] = []
  //selectedUser: string;
  displayedColumns: string[] = ['Gravatar', 'Nama', 'Nip', 'UserRoles'];
  dataSource: any

  @ViewChild("gravatar") gravatarTpl: TemplateRef<any>;
  //@ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private snackbarService: PuiSnackbarService
  ) {}

  /** Called by Angular after user-list component initialized */
  ngOnInit() {
    this.prepareTableContent();
    //this.dataSource.sort = this.sort;
    // specify column
    //this.columns = [
    //  {
    //    cellTemplate: this.gravatarTpl,
    //    prop: "Gravatar",
    //    width: "40"
    //  },
    //  { prop: "Nama" },
    //  { prop: "Nip", width: "170" },
    //  { prop: "UserRoles" }
    //];
  }

  prepareTableContent() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //searchUser(event: any) {
  //  if(event.type == "click") return true
  //  const val = event.target.value.toLowerCase();

  //  const temp = this.temp.filter(function (d) {
  //    return (
  //      d.Nama.toLowerCase().indexOf(val) !== -1 ||
  //      d.Nip.toLowerCase().indexOf(val) !== -1 ||
  //      !val
  //    );
  //  });

  //  this.users = temp;
  //  this.table.offset = 0;
  //}

  onAddNewUserClick() {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        roles: this.authService.allRoles
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userService.postNewUser(result).subscribe(result => {
          this.userService.getUsers().subscribe(result => {
            //this.prepareTableContent();
            this.snackbarService.showSnackBar("success", "Tambah User berhasil!");
          });
        });
      }
    });
  }

  highlight(row) {
    return this.selected.indexOf(row) === -1;
  }
  //onAssignRoleClick() {
  //  let dialogRef = this.dialog.open(UserDetailComponent, {
  //    data: {
  //      user: this.selected[0],
  //      roles: this.selected[0].UserRoles
  //    }
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result != null) {
  //      this.userService.postUserRoles(result).subscribe((response: User) => {
  //        // search user
  //        this.users = this.users.map(x => {
  //          if (x.UserId == response.UserId) {
  //            x = Object.assign({}, x, response);
  //          }
  //          return x;
  //        });
  //        this.snackbarService.showSnackBar();
  //      });
  //    }
  //    //this.animal = result;
  //  });
  //}

}
