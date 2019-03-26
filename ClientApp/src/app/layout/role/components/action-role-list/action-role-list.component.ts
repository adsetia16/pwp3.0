import { Component, OnInit, ViewChild } from "@angular/core";
import { ActionRoleService } from "../../services/action-role.service";
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActionRoleFormComponent } from "../action-role-form/action-role-form.component";
import { RoleAction } from "../../../../shared/models/action-model";
import { ResultModel } from "../../../../shared/models/result-model";
import { PuiSnackbarService } from "../../../../shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service";
import { fuseAnimations } from "@fuse/animations";
import { Pagination } from "app/shared/models/pagination";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";

@Component({
  selector: "app-action-role-list",
  templateUrl: "./action-role-list.component.html",
  styleUrls: ["./action-role-list.component.css"],
  providers: [ActionRoleService],
  animations: fuseAnimations
})
export class ActionRoleListComponent implements OnInit {
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private arService: ActionRoleService,
    public dialog: MatDialog,
    private snackbarService: PuiSnackbarService
  ) {}

  roles: any[] = [];
  ctrActions: any[];
  selected: number
  role: any
  displayedColumns: string[] = ['Role', 'Action'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.prepareTableContent();
    this.selected = -1;
  }

  prepareTableContent() {
    this.arService.getAll().subscribe(result => {
      this.roles = result;
      this.dataSource = new MatTableDataSource(this.roles)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.arService.getSystemController().subscribe(result => {
      this.ctrActions = result;
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

  onEditClick() {
    let sRole: RoleAction = this.role
    let dialogRef = this.dialog.open(ActionRoleFormComponent, {
      //width: '500px',
      data: {
        role: sRole.Role,
        actions: sRole.Actions,
        ctrActions: this.ctrActions
      } //
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        // console.log('isi result', result);

        // post action
        this.arService.post(result).subscribe(
          (result: ResultModel) => {
            // update list
            // this.createContent();
            let submitted: RoleAction = result.data;
            this.roles = this.roles.map((roleAction: RoleAction) => {
              // console.log('inside map', roleAction.Role, submitted.Role);
              if (roleAction.Role == submitted.Role) {
                // console.log("found same", roleAction, submitted);
                roleAction = Object.assign({}, roleAction, submitted);
              }

              return roleAction;
            });
            this.prepareTableContent();
            this.selected = -1;
            this.snackbarService.showSnackBar("success", "Perubahan action berhasil!");
          }, // on success
          error => { }, // on error
          () => { } // on complete
        );
      }
    });
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
