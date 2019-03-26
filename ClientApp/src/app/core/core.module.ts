import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { SidebarsComponent } from './components/sidebars/sidebars.component';
import { MatIconModule, MatCheckboxModule, MatMenuModule, MatButtonModule, MatSelectModule, MatToolbarModule, MatOptionModule, MatInputModule, MatDividerModule, MatListModule } from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WingModule } from '../shared/wing/wing.module';

@NgModule({
  declarations: [LayoutMainComponent, SidebarsComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatOptionModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    WingModule,

    FormsModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  exports: [
    LayoutMainComponent
  ]
})
export class CoreModule { }
