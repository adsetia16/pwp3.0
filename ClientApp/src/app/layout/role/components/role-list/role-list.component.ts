import { Component, OnInit, ViewChild } from "@angular/core";
import { RoleService } from "../../services/role.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { PuiConfirmDialogService } from "../../../../shared/pusintek-ui/components/pui-confirm-dialog/pui-confirm-dialog.service";
import { RoleFormComponent } from "../role-form/role-form.component";
import { ResultModel } from "../../../../shared/models/result-model";
import { PuiSnackbarService } from "../../../../shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { Role } from "../../../user/models/role";
import { fuseAnimations } from "@fuse/animations";
import { Pagination } from "app/shared/models/pagination";


@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.css"],
  providers: [RoleService],
  animations: fuseAnimations
})
export class RoleListComponent extends Pagination implements OnInit {

  role: Role;
  allRoles: Role[];
  select: number
  displayedColumns: string[] = ['RoleId', 'RoleName'];
  dataSource: any

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    public dialog: MatDialog,
    private dialogsService: PuiConfirmDialogService,
    private snackbarService: PuiSnackbarService
  ) {
    super()
  }

  ngOnInit() {
    this.getData()
  }

  getData(params: { [key: string]: any } = {}) {
    params = Object.assign(params, this.requestParams())
    this.roleService.getAllByPagination(params).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.listData)
      this.totalData = result.totalItems
      this.allRoles = result.listData
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
      this.role = row;
    } else {
      this.select = -1;
    }
  }

  onDeleteClick() {
    let role = this.role;
    //material confirm
    this.dialogsService
      .confirm("Konfirmasi", "Yakin mau menghapus role?")
      .subscribe(accept => {
        if (accept) {
          this.roleService.deleteRole(role).subscribe(
            result => {
              //this.allRoles.splice(this.allRoles.indexOf(role), 1);
              this.getData()
              this.snackbarService.showSnackBar("success", "Hapus role berhasil!");
            },
            error => {
              console.log("error happened");
            },
            () => {
              // on completed
              console.log("completed post");
            }
          );
        } else {
          console.log("batal hapus");
        }
      });
  }

  onEditClick() {
    let dialogRef = this.dialog.open(RoleFormComponent, {
      disableClose: true,
      data: this.role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.roleService.putRole(result).subscribe((result: ResultModel) => {
          /*
          // cari di list yang namanya origin
          this.allRoles = this.allRoles.map((role: IRole) => {
              if (role.RoleId == result.data.RoleId) {
                  role = Object.assign({}, role, result.data);
              }

              return role;
          });
          */
          this.getData()
          this.snackbarService.showSnackBar();
        });
      }
    });
  }

  openRoleAddDialog() {
    let dialogRef = this.dialog.open(RoleFormComponent, {
      //width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("role form dialog closed");
      if (result != null) {
        this.roleService.postRole(result).subscribe((result: ResultModel) => {

          // cek apakah sudah ada datanya
          let index = this.allRoles.filter(
            (role: Role) => role.RoleName == result.data.RoleName
          );
          if (index.length > 0) {
            this.snackbarService.showSnackBar(
              "error",
              "Role " + result.data.RoleName + " sudah ada!"
            );
          } else {
            // belum ada
            /*
            this.allRoles.push(result.data);
            this.allRoles = this.allRoles.map((role: IRole) => {
              return role;
            });
            */
            this.getData()
            this.snackbarService.showSnackBar();
          }
        });
      }
    });
  }

  updateAllRolesInAuthService() {
    // update isi allRoles di authService, dilakukan setelah proses update, delete, atau add
    this.authService.allRoles = this.allRoles;
  }
}
