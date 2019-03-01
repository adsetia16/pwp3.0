import { Component, OnInit, ViewChild } from "@angular/core";
import { ActionRoleService } from "../../services/action-role.service";
import { MatDialog, MatSnackBar } from "@angular/material";
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
    tempRoles: any[];
    columns: any[];
    selected: any[] = [];
    ctrActions: any[];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    ngOnInit() {
        this.createContent();
        // specify columns
        this.columns = [{ prop: "Role" }, { prop: "Action" }];
    }

    createContent() {
        this.arService.getAll().subscribe(result => {
            this.roles = result;
            this.tempRoles = result;
        });

        this.arService.getSystemController().subscribe(result => {
            this.ctrActions = result;
        });
    }

    openActionFormDialog() {
        let sRole: RoleAction = this.selected[0];
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

                        this.snackbarService.showSnackBar("success", "Perubahan action berhasil!");
                    }, // on success
                    error => { }, // on error
                    () => { } // on complete
                );
            }
        });
    }

    onEditClick() {
        if (this.checkSelected()) {
            this.openActionFormDialog();
        }
    }

    checkSelected(): boolean {
        let isSelected = this.selected.length > 0;
        if (!isSelected) {
            this.snackbarService.showSnackBar('info', 'Pilih role terlebih dahulu!');
            return false;
        } else {
            return true;
        }
    }

    searchRole(event: any) {
        if(event.type == "click") return true
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.tempRoles.filter(function (d) {
            return d.Role.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.roles = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
}
