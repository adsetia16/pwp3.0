import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleListComponent } from "./components/role-list/role-list.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
  MatExpansionModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,

} from "@angular/material";
import { RoleDetailComponent } from "./components/role-detail/role-detail.component";
import { RoleFormComponent } from "./components/role-form/role-form.component";
import { ActionRoleFormComponent } from "./components/action-role-form/action-role-form.component";
import { ActionRoleListComponent } from "./components/action-role-list/action-role-list.component";
import { DataTableImporter } from "../../shared/models/mat-material-importer";
import { RoleRoutingModule } from "./role-routing.module";
import { WingModule } from "app/shared/wing/wing.module";
import { FuseWidgetModule, FuseSearchBarModule } from "@fuse/components";

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ...DataTableImporter,
    RoleRoutingModule,
    FuseSearchBarModule,
    FuseWidgetModule,
    WingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    RoleListComponent,
    RoleDetailComponent,
    RoleFormComponent,
    ActionRoleFormComponent,
    ActionRoleListComponent
  ]
})
export class RoleModule {}
