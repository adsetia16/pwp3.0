import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EAgendaComponent, ButtonSideBarComponent } from './e-agenda/e-agenda.component';
import { AppsRoutingModule } from './apps-routing.module';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatMenuModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatToolbarModule, MatOptionModule, MatInputModule, MatDividerModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { SidebarsComponent } from './e-agenda/sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    AppsRoutingModule,
    CommonModule,
    RouterModule,

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

    FormsModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  exports: [
    EAgendaComponent,
    ButtonSideBarComponent
  ],
  declarations: [EAgendaComponent, SidebarsComponent, ButtonSideBarComponent]
})
export class AppsModule { }
