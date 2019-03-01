import { NgModule } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { DataTableImporter } from '../../shared/models/mat-material-importer';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { FuseSearchBarModule, FuseWidgetModule } from '@fuse/components';
import { MatListModule, MatDialogModule, MatChipsModule, MatExpansionModule, MatSlideToggleModule, MatSelectModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatToolbarModule } from '@angular/material';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { WingModule } from 'app/shared/wing/wing.module';

@NgModule({
  imports: [
    MatListModule,
    // material modules
    MatDialogModule,
    MatChipsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatToolbarModule,
    ...DataTableImporter,
    UserRoutingModule,
    CommonModule,
    FuseSearchBarModule,
    FuseWidgetModule,
    WingModule
  ],
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailComponent,
  ],
  providers: [
  ],
  entryComponents: [UserFormComponent, UserDetailComponent]
})
export class UserModule { }
