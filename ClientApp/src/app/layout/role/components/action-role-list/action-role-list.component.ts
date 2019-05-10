import { Component, OnInit, ViewChild } from "@angular/core";
import { ActionRoleService } from "../../services/action-role.service";
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActionRoleFormComponent } from "../action-role-form/action-role-form.component";
import { RoleAction } from "../../../../shared/models/action-model";
import { ResultModel } from "../../../../shared/models/result-model";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { PuiSnackbarService } from "../../../../shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service";
import { fuseAnimations } from "@fuse/animations";
import { Pagination } from "app/shared/models/pagination";

@Component({
  selector: "app-action-role-list",
  templateUrl: "./action-role-list.component.html",
  styleUrls: ["./action-role-list.component.css"],
  providers: [ActionRoleService],
  animations: fuseAnimations
})
export class ActionRoleListComponent extends Pagination implements OnInit {
  constructor(
    private arService: ActionRoleService,
    public dialog: MatDialog,
    private snackbarService: PuiSnackbarService
  ) {
    super()
  }

  roles: any[] = [];
  ctrActions: any[];
  select: number
  role: any
  displayedColumns: string[] = ['Role', 'Action'];
  dataSource: any

  ngOnInit() {
    this.getData()
  }

  getData(params: { [key: string]: any } = {}) {
    params = Object.assign(params, this.requestParams())
    this.arService.getAllByPagination(params).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.listData)
      this.totalData = result.totalItems
      this.roles = result.listData
      this.select = -1
    })

    this.arService.getSystemController().subscribe(result => {
      this.ctrActions = result
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
            this.getData()
            this.snackbarService.showSnackBar("success", "Perubahan action berhasil!");
          }, // on success
          error => { }, // on error
          () => { } // on complete
        );
      }
    });
  }
}
