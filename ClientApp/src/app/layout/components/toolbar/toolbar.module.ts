import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatCheckboxModule, MatSelectModule, MatOptionModule, MatInputModule, MatDividerModule, MatListModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatOptionModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,

    FuseSharedModule,
    FuseSearchBarModule,
    FuseShortcutsModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
