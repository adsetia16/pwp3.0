import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { TreeModule, ContextMenuModule, PanelMenuModule, TreeTableModule } from 'primeng/primeng';
import { MatExpansionModule, MatListModule, MatChipsModule, MatRadioModule, MatSlideToggleModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component';
import { MenuRoutingModule } from './menu-routing.module';
import { DataTableImporter } from '../../shared/models/mat-material-importer';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    TreeModule,
    ContextMenuModule,
    PanelMenuModule,
    MatExpansionModule,
    TreeTableModule,
    MatListModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MenuRoutingModule,
    MatSnackBarModule,
    ...DataTableImporter,

  ],
  declarations: [
    MenuListComponent,
    MenuFormComponent,
    MenuDetailComponent
  ]
})
export class MenuModule { }
