import { Component, OnInit, ViewChild } from "@angular/core";
import { RoleService } from "../../services/role.service";
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { PuiConfirmDialogService } from "../../../../shared/pusintek-ui/components/pui-confirm-dialog/pui-confirm-dialog.service";
import { RoleFormComponent } from "../role-form/role-form.component";
import { ResultModel } from "../../../../shared/models/result-model";
import { PuiSnackbarService } from "../../../../shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { Role } from "../../../user/models/role";
import { fuseAnimations } from "@fuse/animations";
import { Pagination } from "app/shared/models/pagination";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";


@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
  providers: [RoleService],
  animations: fuseAnimations
})
export class RoleListComponent implements OnInit {

  role: Role;
  allRoles: Role[];
  selected: number
  displayedColumns: string[] = ['RoleId', 'RoleName'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private authService: AuthService,
    private roleService: RoleService,
    public dialog: MatDialog,
    private dialogsService: PuiConfirmDialogService,
    private snackbarService: PuiSnackbarService
  ) { }

  ngOnInit() {
    this.prepareTableContent();
    this.selected = -1;
  }

  prepareTableContent() {
    this.roleService.getAll().subscribe(result => {
      this.allRoles = result;
      this.dataSource = new MatTableDataSource(this.allRoles)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  highlight(index, row) {
    if (this.selected != index) {
      this.selected = index;
      this.role = row;
    } else {
      this.selected = -1;
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
              this.selected = -1;// langsung create data untuk update isi tabel
              this.prepareTableContent();
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
          this.selected = -1;
          this.prepareTableContent();
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
            this.prepareTableContent(); // langsung create data supaya isi tabel terupdate
            this.selected = -1;
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


  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
